"use client";

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useState } from 'react';
import { setIsSidebarCollapsed } from '@/state';
import { useGetProjectsQuery } from '@/state/api';

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  
  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;
  return (
    <div className={sidebarClassNames}>
      <div className='flex h-[100%] flex-col justify-start w-full'>
        <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black'>
          <div className='tex-xl font-bold text-gray-800 dark:text-white'>
            FLEXO LIST
          </div>
          { isSidebarCollapsed ? null : (
            <button className='py-3' onClick={() => {dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
            }}>
              <X className='h-6 w-6 text-gray-800 dark:text-white hover:text-gray-500' />
            </button>
          )}
        </div>

        <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 py-4 px-8 dark:border-gray-700'>
          <Image src="https://pm-s3-picture.s3.ap-south-1.amazonaws.com/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className='text-md font-bold tracking-widest dark:text-gray-200'>
              FLEXO&apos;S TEAM
            </h3>
            <div className='mt-1 flex items-start gap-2'>
              <LockIcon className='h-3 w-3 mt-[0.1rem] text-gray-500 dark:text-gray-400' />
              <p className='text-xs text-gray-500'>Private</p>
            </div>
          </div>
        </div>
        {/* NAVBAR LINKS */}
        <nav className='z-10 w-full'>
          <SidebarLink href='/' icon={Home} label='Home' isCollapsed={false} />
          <SidebarLink href='/timeline' icon={Briefcase} label='Timeline' isCollapsed={false} />
          <SidebarLink href='/search' icon={Search} label='Search' isCollapsed={false} />
          <SidebarLink href='/settings' icon={Settings} label='Settings' isCollapsed={false} />
          <SidebarLink href='/users' icon={User} label='Users' isCollapsed={false} />
          <SidebarLink href='/teams' icon={Users} label='Teams' isCollapsed={false} />
        </nav>
        <button onClick={() => setShowProjects((prev) => !prev)} className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
          <span className=''>Projects</span>
          {showProjects ? (
            <ChevronUp className='h-5 w-5' />
          ): (
            <ChevronDown className='h-5 w-5' />
          )}
        </button>
        {showProjects && 
            projects?.map((project) => (
              <SidebarLink key={project.id} href={`/projects/${project.id}`} icon={Briefcase} label={project.name} isCollapsed={false} />
            )
        )}


        <button onClick={() => setShowPriority((prev) => !prev)} className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
          <span className=''>Priority</span>
          {showPriority ? (
            <ChevronUp className='h-5 w-5' />
          ): (
            <ChevronDown className='h-5 w-5' />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink href='/priority/urgent' icon={AlertCircle} label='Urgent' isCollapsed={false} />
            <SidebarLink href='/priority/high' icon={ShieldAlert} label='High' isCollapsed={false} />
            <SidebarLink href='/priority/medium' icon={AlertTriangle} label='Medium' isCollapsed={false} />
            <SidebarLink href='/priority/low' icon={AlertOctagon} label='Low' isCollapsed={false} />
            <SidebarLink href='/priority/backlog' icon={Layers3} label='Backlog' isCollapsed={false} />
          </>
        )}
      </div>
    </div>
  )
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === '/' && href === '/dashboard');
  

  return (
    <Link href={href} className='w-full'>
      <div className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 text-white dark:bg-gray-700' : ''} justify-start px-8 py-3`}>
        {isActive && (<div className='absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200' />
        )}
        <Icon className='h-6 w-6 text-gray-800 dark:text-gray-100' />
        <span className={`font-medium text-gray-500 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
 };

export default Sidebar