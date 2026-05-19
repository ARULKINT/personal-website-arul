import {
  SiFigma,
  SiCanva,
  SiHtml5,
  SiJavascript,
  SiPython,
  SiMysql,
  SiMongodb,
  SiApachehadoop,
  SiApachespark,
  SiApachehive,
  SiApachekafka,
  SiUbuntu,
  SiClaude,
} from 'react-icons/si';
import {
  Image as ImageIcon,
  PenTool,
  Film,
  Wand2,
  FileSpreadsheet,
  FileText,
  Presentation,
  Database,
  MonitorDot,
  Bot,
  Code2,
} from 'lucide-react';

export const TOOL_GROUPS = [
  {
    id: 'design',
    title: 'Design',
    color: '#ff2bd6',
    tools: [
      { name: 'Figma', Icon: SiFigma },
      { name: 'Photoshop', Icon: ImageIcon },
      { name: 'Illustrator', Icon: PenTool },
      { name: 'Canva', Icon: SiCanva },
      { name: 'Premiere Pro', Icon: Film },
      { name: 'After Effects', Icon: Wand2 },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    color: '#00f5ff',
    tools: [
      { name: 'HTML', Icon: SiHtml5 },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'Python', Icon: SiPython },
      { name: 'SQL', Icon: Database },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    color: '#7a5cff',
    tools: [
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'MySQL', Icon: SiMysql },
    ],
  },
  {
    id: 'bigdata',
    title: 'Big Data',
    color: '#9dff00',
    tools: [
      { name: 'Hadoop', Icon: SiApachehadoop },
      { name: 'Spark', Icon: SiApachespark },
      { name: 'Hive', Icon: SiApachehive },
      { name: 'Kafka', Icon: SiApachekafka },
    ],
  },
  {
    id: 'productivity',
    title: 'Productivity',
    color: '#ffb800',
    tools: [
      { name: 'Excel', Icon: FileSpreadsheet },
      { name: 'PowerPoint', Icon: Presentation },
      { name: 'Word', Icon: FileText },
    ],
  },
  {
    id: 'os',
    title: 'Operating Systems',
    color: '#00f5ff',
    tools: [
      { name: 'Linux Ubuntu', Icon: SiUbuntu },
      { name: 'Windows', Icon: MonitorDot },
    ],
  },
  {
    id: 'ai',
    title: 'AI Tools',
    color: '#ff2bd6',
    tools: [
      { name: 'Claude Code', Icon: SiClaude },
      { name: 'Claude Co-work', Icon: Bot },
      { name: 'Codex', Icon: Code2 },
    ],
  },
];
