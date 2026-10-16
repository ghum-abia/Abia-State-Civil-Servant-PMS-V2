import {
  LayoutDashboard, FileText, Folder, Calendar, Layers, Settings,
  CheckSquare, TrendingUp, Users, UserCog, Building2, BarChart3, ShieldCheck, Layers2, Sliders,
  File,
  FileArchive,
  User,
  Users2,
  Boxes,
  FolderPlus,
  Bell
} from 'lucide-react';

export const sidebarRoutes = [

  // --- staff ---
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['STAFF'] },
  { title: 'My Performance', path: '/performance', icon: FileText, roles: ['STAFF'] },
  { title: 'Tasks', path: '/tasks', icon: Folder, roles: ['STAFF'] },
  { title: 'Reports', path: '/reports', icon: Calendar, roles: ['STAFF'] },
  { title: 'Notifications', path: '/notification', icon: Bell, roles: ['STAFF'] },
  { title: 'My Profile', path: '/profile', icon: User, roles: ['STAFF'] },


  // --- HOD ---
  { title: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard, roles: ['HOD'] },
  { title: 'My Staffs', path: '/mystaffs', icon: Users, roles: ['HOD'] },
  { title: 'Tasks Inbox', path: '/hodtasks', icon: Folder, roles: ['HOD'] },
  { title: 'Assign Tasks', path: '/assigntasks', icon: FolderPlus, roles: ['HOD'] },
  { title: 'Team Performance', path: '/hodperformance', icon: TrendingUp, roles: ['HOD'] },
  { title: 'Reports', path: '/hodreports', icon: FileText, roles: ['HOD'] },
  { title: 'Notification', path: '/hodnotification', icon: Bell, roles: ['HOD'] },
  { title: 'My Profile', path: '/hodprofile', icon: User, roles: ['HOD'] },


  // --- PERM SEC & DIC'S  --- HOM ---
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['HOM'] },
  { title: 'MDA Performance', path: '/mdaperformance', icon: Users, roles: ['HOM'] },
  { title: 'Departments', path: '/departments', icon: Building2, roles: ['HOM'] },
  { title: 'Reports', path: '/homreports', icon: BarChart3, roles: ['HOM'] },
  { title: 'Notifications', path: '/homnotification', icon: Bell, roles: ['HOM'] },
  { title: 'My Profile', path: '/homprofile', icon: User, roles: ['HOM'] },


  // --- HOS ---
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['HOS'] },
  { title: 'HODs', path: '/department-heads', icon: Users2, roles: ['HOS'] },
  { title: 'Departments', path: '/departments', icon: Building2, roles: ['HOS'] },
  { title: 'Compliance', path: '/compliances', icon: TrendingUp, roles: ['HOS'] },
  { title: 'Reports', path: '/hos-reports', icon: FileText, roles: ['HOS'] },
  { title: 'Settings', path: '/hos-settings', icon: Settings, roles: ['HOS'] },
];