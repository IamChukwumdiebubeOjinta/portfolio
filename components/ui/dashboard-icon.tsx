import {
  FolderOpen,
  FileText,
  Settings,
  Eye,
  Users,
  TrendingUp,
  Plus,
  Edit,
  CheckCircle,
  Calendar,
  Mail,
  Activity,
  BarChart3,
  Globe,
  Clock,
} from 'lucide-react';

interface DashboardIconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  FolderOpen,
  FileText,
  Settings,
  Eye,
  Users,
  TrendingUp,
  Plus,
  Edit,
  CheckCircle,
  Calendar,
  Mail,
  Activity,
  BarChart3,
  Globe,
  Clock,
};

export function DashboardIcon({ name, className = 'h-4 w-4' }: DashboardIconProps) {
  const IconComponent = iconMap[name] || Activity;
  return <IconComponent className={className} />;
} 