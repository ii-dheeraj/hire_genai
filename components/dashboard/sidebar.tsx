'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Calendar,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Plus,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  UserCog,
  HeadphonesIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMobileMenu } from './mobile-menu-context'

const navigationItems = [
  {
    title: 'MAIN',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Applications', href: '/dashboard/candidates', icon: Users, badge: 12 },
      { name: 'Job Postings', href: '/dashboard/jobs', icon: Briefcase },
      { name: 'Talent Pool', href: '/dashboard/talent-pool', icon: Users, badge: 12 },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
      { name: 'Delegation', href: '/dashboard/delegation', icon: UserCog },
      { name: 'Support', href: '/dashboard/support', icon: HeadphonesIcon },
      { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed } = useMobileMenu()

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white z-50 overflow-y-auto shadow-xl transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[220px]",
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="p-2 border-b border-white/10">
          <div className="flex items-center justify-between gap-1.5 mb-1.5">
            {!isCollapsed && (
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-blue-700">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-base font-bold">HireGenAI</span>
              </div>
            )}
            {isCollapsed && (
              <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-blue-700 mx-auto">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 bg-transparent h-7 w-7"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Collapse/Expand Button */}
          <div className="mb-2 hidden lg:block">
            <Button
              variant="ghost"
              size="icon"
              className={`${isCollapsed ? 'mx-auto' : 'w-full'} text-white/90 hover:bg-white/10 hover:text-white bg-transparent h-7 w-7`}
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronLeft className="w-3 h-3" />
              )}
            </Button>
          </div>

          {/* User Profile */}
          {!isCollapsed ? (
            <div className="flex items-center gap-1.5 p-1.5 bg-white/10 rounded-lg">
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-blue-700 font-semibold text-[10px] flex-shrink-0">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[11px] truncate leading-tight">John Doe</h4>
                <p className="text-[9px] opacity-80 truncate leading-tight">john@company.com</p>
                <Badge className="mt-0.5 bg-green-500 hover:bg-green-600 text-white text-[8px] px-1 py-0 leading-tight">
                  HR Manager
                </Badge>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-blue-700 font-semibold text-[10px]">
                JD
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {navigationItems.map((section) => (
            <div key={section.title} className="mb-4">
              {!isCollapsed && (
                <h3 className="px-2 mb-1.5 text-[10px] font-semibold text-white/60 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        className={`w-full ${
                          isCollapsed ? 'justify-center' : 'justify-start'
                        } text-white/90 hover:bg-white/10 hover:text-white transition-colors bg-transparent ${
                          isActive ? 'bg-white/20 text-white' : ''
                        } ${isCollapsed ? 'h-9' : 'h-8'} text-sm`}
                        size={isCollapsed ? "icon" : "sm"}
                        title={isCollapsed ? item.name : undefined}
                      >
                        <Icon className="w-4 h-4" />
                        {!isCollapsed && <span className="ml-2">{item.name}</span>}
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-white/10">
          {!isCollapsed ? (
            <Button
              variant="ghost"
              className="w-full justify-start text-white/90 hover:bg-white/10 hover:text-white"
              onClick={() => {
                if (confirm('Are you sure you want to logout?')) {
                  window.location.href = '/'
                }
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 mx-auto text-white/90 hover:bg-white/10 hover:text-white"
              title="Logout"
              onClick={() => {
                if (confirm('Are you sure you want to logout?')) {
                  window.location.href = '/'
                }
              }}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </aside>
    </>
  )
}
