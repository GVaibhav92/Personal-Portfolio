import { useState, type CSSProperties, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Cable,
  Cloud,
  Network,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import {
  siDart,
  siDocker,
  siFlutter,
  siGin,
  siGo,
  siGrafana,
  siJsonwebtokens,
  siK6,
  siPostgresql,
  siPostman,
  siPrometheus,
  siRabbitmq,
  siReact,
  siRedis,
  siSqlite,
} from 'simple-icons';

type Item = {
  name: string;
  icon?: {
    path: string;
    hex: string;
  };
  Fallback?: LucideIcon;
  core?: boolean;
};

type Category = {
  id: string;
  label: string;
  items: Item[];
};

const categories: Category[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'Flutter', icon: siFlutter },
      { name: 'Dart', icon: siDart },
      { name: 'React', icon: siReact },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'Go', icon: siGo, core: true },
      { name: 'Gin', icon: siGin },
      { name: 'REST APIs', Fallback: Network },
      { name: 'gRPC', Fallback: Cable },
      { name: 'JWT', icon: siJsonwebtokens },
      { name: 'OAuth2', Fallback: ShieldCheck },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: siPostgresql, core: true },
      { name: 'Redis', icon: siRedis, core: true },
      { name: 'SQLite', icon: siSqlite },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    items: [
      { name: 'Docker', icon: siDocker, core: true },
      { name: 'RabbitMQ', icon: siRabbitmq },
      { name: 'AWS', Fallback: Cloud },
    ],
  },
  {
    id: 'observability',
    label: 'Observability and testing',
    items: [
      { name: 'Prometheus', icon: siPrometheus },
      { name: 'Grafana', icon: siGrafana },
      { name: 'k6', icon: siK6 },
      { name: 'Postman', icon: siPostman },
    ],
  },
];

const getLuminance = (hex: string): number => {
  const number = parseInt(hex, 16);

  return (
    0.299 * (number >> 16) +
    0.587 * ((number >> 8) & 255) +
    0.114 * (number & 255)
  ) / 255;
};

const handleSpotlight = (event: MouseEvent<HTMLElement>): void => {
  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();

  element.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
  element.style.setProperty('--my', `${event.clientY - bounds.top}px`);
};

function Logo({ item, size }: { item: Item; size: number }) {
  if (item.icon) {
    return (
      <svg
        className="logo"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <path d={item.icon.path} />
      </svg>
    );
  }

  const FallbackIcon = item.Fallback;

  if (!FallbackIcon) {
    return null;
  }

  return (
    <FallbackIcon
      className="logo-l"
      size={size}
      aria-hidden="true"
    />
  );
}

function SkillTile({
  item,
  index,
  large = false,
}: {
  item: Item;
  index: number;
  large?: boolean;
}) {
  const brandColor = item.icon
    ? getLuminance(item.icon.hex) < 0.3
      ? 'var(--text)'
      : `#${item.icon.hex}`
    : 'var(--acc)';

  return (
    <motion.li
      className={`card sk ${large ? 'core' : ''}`}
      style={{ '--brand': brandColor } as CSSProperties}
      onMouseMove={handleSpotlight}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -5 }}
    >
      <Logo item={item} size={large ? 44 : 30} />

      <span className={large ? 'font-bold' : 'text-sm'}>
        {item.name}
      </span>
    </motion.li>
  );
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const visibleCategories =
    selectedCategory === 'all'
      ? categories
      : categories.filter(
          (category) => category.id === selectedCategory,
        );

  const coreSkills = categories
    .flatMap((category) => category.items)
    .filter((item) => item.core);

  const filters = [
    { id: 'all', label: 'All', items: [] as Item[] },
    ...categories,
  ];

  return (
    <section id="skills" className="sec">
      <div className="wrap">
        <h2 className="h2">Skills</h2>

        <p className="mute -mt-4 mb-8 max-w-xl">
            Technologies and  tools that power my development workflows.
        </p>

        <p className="cap mb-3">Core stack</p>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {coreSkills.map((item, index) => (
            <SkillTile
              key={item.name}
              item={item}
              index={index}
              large
            />
          ))}
        </ul>

        <p className="cap mb-4 mt-12">Follow a request</p>

        <div
          className="flow"
          role="tablist"
          aria-label="Filter skills by stage of a request"
        >
          <span className="flow-line" aria-hidden="true">
            <motion.i
              animate={{ left: ['0%', '100%'] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </span>

          {filters.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category.id}
              className={`btn stage ${
                selectedCategory === category.id ? 'on' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.items[0] && (
                <Logo item={category.items[0]} size={16} />
              )}

              {category.label}
            </button>
          ))}
        </div>

        <motion.div
          key={selectedCategory}
          className="mt-8 space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {visibleCategories.map((category) => (
            <div key={category.id}>
              <h3 className="mb-3 font-bold">{category.label}</h3>

              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {category.items.map((item, index) => (
                  <SkillTile
                    key={item.name}
                    item={item}
                    index={index}
                  />
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}