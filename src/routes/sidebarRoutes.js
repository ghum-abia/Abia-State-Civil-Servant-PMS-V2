import {
  LayoutDashboard, FileText, Folder, Calendar, Layers, Settings,
  CheckSquare, TrendingUp, Users, UserCog, Building2, BarChart3, ShieldCheck, Layers2, Sliders,
  File,
  FileArchive,
  User,
  Users2,
  FileBadge,
  Settings2,
  Briefcase,
  Boxes
} from 'lucide-react';

export const sidebarRoutes = [

  // --- staff ---
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['staff'] },
  { title: 'My Performance', path: '/performance', icon: FileText, roles: ['staff'] },
  { title: 'Tasks', path: '/tasks', icon: Folder, roles: ['staff'] },
  { title: 'Reports', path: '/reports', icon: Calendar, roles: ['staff'] },
  { title: 'My profile', path: '/profile', icon: Layers, roles: ['staff'] },
  { title: 'Notifications', path: '/notifications', icon: Settings, roles: ['staff'] },


  // --- HOD ---
  { title: 'Dashboard Overview', path: '/overviewdashboard', icon: LayoutDashboard, roles: ['hod'] },
  { title: 'My Staff', path: '/mystaffs', icon: CheckSquare, roles: ['hod'] },
  { title: 'Tasks', path: '/hodtasks', icon: TrendingUp, roles: ['hod'] },
  { title: 'Assign', path: '/assign', icon: TrendingUp, roles: ['hod'] },
  { title: 'Team Performance', path: '/hodperformance', icon: TrendingUp, roles: ['hod'] },
  { title: 'Reports', path: '/hodreports', icon: TrendingUp, roles: ['hod'] },
  { title: 'My Profile', path: '/hodprofile', icon: TrendingUp, roles: ['hod'] },
  { title: 'Notification', path: '/hodnotification', icon: TrendingUp, roles: ['hod'] },
  { title: 'Settings', path: '/hodsettings', icon: Settings, roles: ['hod'] },


  // --- PERM SEC & DIC'S  --- HOM ---
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['hom'] },
  { title: 'MDA Performance', path: '/mdaperformance', icon: Users, roles: ['hom'] },
  { title: 'Departments', path: '/departments', icon: BarChart3, roles: ['hom'] },
  { title: 'Objectives', path: '/objectives', icon: BarChart3, roles: ['hom'] },
  { title: 'KPIs', path: '/kpis', icon: BarChart3, roles: ['hom'] },
  { title: 'Reports', path: '/homreports', icon: BarChart3, roles: ['hom'] },
  { title: 'Notifications', path: '/homnotification', icon: BarChart3, roles: ['hom'] },
  { title: 'My Profile', path: '/homprofile', icon: BarChart3, roles: ['hom'] },
  { title: 'Settings', path: '/homsettings', icon: Settings, roles: ['hom'] },


  // --- HOS ---
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['hos'] },
  { title: 'HODs', path: '/department-heads', icon: Users2, roles: ['hos'] },
  { title: 'Departments', path: '/departments', icon: Building2, roles: ['hos'] },
  { title: 'Compliance', path: '/compliances', icon: TrendingUp, roles: ['hos'] },
  { title: 'Reports', path: '/hos-reports', icon: FileText, roles: ['hos'] },
  { title: 'Settings', path: '/hos-settings', icon: Settings, roles: ['hos'] },
];