export const links = {
  github: 'https://github.com/GVaibhav92',
  linkedin: 'https://www.linkedin.com/in/vaibhav-gupta-078134306/',
  leetcode: 'https://leetcode.com/u/VaibhavG_92/',
  email: 'vishuguptaa9262@gmail.com',
  resume: '', // Set to '/resume.pdf' after adding the file to /public
};

export type Project = {
  name: string;
  desc: string;
  tech: string[];
  repo: string;
  points: string[];
  metrics?: [string, string][];
  note?: string;
  demo?: {
    label: string;
    url: string;
  };
};

export const projects: Project[] = [
  {
    name: 'URLify',
    desc: 'A containerized URL shortener in Go with Redis cache-aside redirects, atomic rate limiting, JWT authentication, and a full Prometheus and Grafana observability stack.',
    tech: [
      'Go',
      'Gin',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Prometheus',
      'Grafana',
      'k6',
    ],
    repo: 'https://github.com/GVaibhav92/URLify',
    demo: {
      label: 'Grafana snapshot',
      url: 'https://snapshots.raintank.io/dashboard/snapshot/Q2iG099Sq3ky6Fx9DjoSM51p2JoU3VQx',
    },
    metrics: [
      ['376', 'requests/sec'],
      ['9.83 ms', 'P99 latency'],
      ['99.8%', 'cache hit ratio'],
    ],
    note: 'k6 load test with 50 virtual users for approximately 3 minutes using a local Docker Compose setup. Rate limits were raised during the benchmark.',
    points: [
      'Redirects resolve from Redis first, fall back to PostgreSQL, and cache the result for 24 hours. Deleting a URL removes its cache key immediately.',
      'Rate limiting uses a token bucket implemented as an atomic Redis Lua script, preventing concurrent requests from spending the same token.',
      'A bounded goroutine worker pool health-checks every registered URL on a timer and records results in PostgreSQL and Prometheus.',
      'JWT authentication using HS256 with bcrypt password hashing, along with graceful shutdown that drains in-flight requests.',
      'Prometheus metrics feed an 11-panel Grafana dashboard with three alert rules. A multi-stage Docker build keeps the image size around 15 MB.',
    ],
  },
  {
    name: 'CampusHub',
    desc: 'A multi-tenant campus platform for booking labs and rooms and reporting maintenance issues, running on a serverless AWS stack.',
    tech: [
      'Go',
      'Gin',
      'PostgreSQL',
      'AWS Lambda',
      'API Gateway',
      'Cognito',
      'RDS',
      'VPC',
      'Docker',
    ],
    repo: 'https://github.com/GVaibhav92/CampusHub',
    note: 'AWS services in use: VPC, RDS, Lambda, ECR, API Gateway, Cognito, Secrets Manager, and IAM.',
    points: [
      'Multi-tenant by design: institutions share one PostgreSQL database, and every row carries a tenant_id so each college only sees its own data.',
      'A PostgreSQL exclusion constraint prevents overlapping bookings of the same resource at the database level without relying on an application-side conflict check.',
      'The Go backend runs on AWS Lambda as a container image from ECR, behind an API Gateway HTTP API with one catch-all route handled by the Go router.',
      'Cognito handles sign-up and login. The backend verifies the signed JWT and then looks up the tenant and role from its own users table.',
      'Lambda and RDS share a private VPC where only the Lambda security group can reach the database. There is no NAT Gateway, credentials come from Secrets Manager, and IAM roles follow the principle of least privilege.',
      'Planned next steps include S3 photo attachments for issue reports, SQS and SNS notifications through a worker Lambda, and CloudWatch dashboards.',
    ],
  },
  {
    name: 'Personal Portfolio',
    desc: 'The site you are looking at, built to present engineering work clearly and responsively.',
    tech: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vercel',
    ],
    repo: 'https://github.com/GVaibhav92/Personal-Portfolio',
    points: [
      'Single-page portfolio with an active-section glass navbar and light and dark theme support.',
      'Interactive request-flow demo featuring a dancing Go panda drawn in SVG.',
      'Respects reduced-motion settings for improved accessibility.',
    ],
  },
];

export const education = [
  {
    title: 'Integrated M.Tech, Computer Science and Engineering',
    where: 'VIT Vellore',
    when: 'Present',
    note: 'CGPA 8.95',
  },
  {
    title: 'Class XII',
    where: 'Delhi Public School Gurgaon',
    when: '2023',
    note: 'Percentage: 93%',
  },
  {
    title: 'Class X',
    where: 'Delhi Public School Gurgaon',
    when: '2021',
    note: 'Percentage: 95%',
  },
];

export const experience: {
  role: string;
  org: string;
  when?: string;
  bullets?: string[];
}[] = [
  {
    role: 'Senior Core',
    org: 'SIAM, VIT',
    bullets: [
      'Led technical project cycles while actively contributing to the organization of hackathons, events, and technical workshops.',
    ],
  },
];

export const certificates: {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  credentialId?: string;
}[] = [
  {
    name: 'The Complete Flutter Development Bootcamp with Dart',
    issuer: 'Udemy',
    year: '2025',
    url: 'https://www.udemy.com/certificate/UC-d1114bbd-0de9-431c-8a1f-35a59d0d5af2/',
    credentialId: 'UC-d1114bbd-0de9-431c-8a1f-35a59d0d5af2',
  },
  {
    name: "Go: The Complete Developer's Guide (Golang)",
    issuer: 'Udemy',
    year: '2025',
    url: 'https://www.udemy.com/certificate/UC-d2120216-3420-4294-a2a8-c7d6a9c8f120/',
    credentialId: 'UC-d2120216-3420-4294-a2a8-c7d6a9c8f120',
  },
  {
    name: 'AI Fluency Framework & Foundations',
    issuer: 'Anthropic',
    year: '2026',
    url: 'https://verify.skilljar.com/c/2hu95zjapoj9',
    credentialId: '2hu95zjapoj9',
  },
];

export const skills: Record<string, string[]> = {
  Backend: ['Go', 'Gin', 'REST APIs', 'gRPC', 'JWT', 'OAuth2'],
  Databases: ['PostgreSQL', 'Redis', 'SQLite'],
  Infrastructure: ['Docker', 'AWS', 'RabbitMQ'],
  'Observability and testing': [
    'Prometheus',
    'Grafana',
    'k6',
    'Postman',
  ],
  Frontend: ['Flutter', 'Dart', 'React'],
};
