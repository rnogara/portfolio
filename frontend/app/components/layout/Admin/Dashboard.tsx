'use client';
import React from 'react'
import { Button } from '@/app/components/ui/button'
import ContentList from './ContentList'
import ProjectsList from './ProjectsList'
import ContentForm from './ContentForm'
import ProjectsForm from './ProjectsForm'
import { useAdmin } from '@/app/context/AdminContext'
import { useAuth } from '@/app/context/AuthContext'

const Dashboard = () => {
  const { setSelectedTab, selectedTab } = useAdmin();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <nav className="bg-gray-800 shadow-sm text-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Admin</h1>
              </div>
              <div className="ml-3 h-full flex items-center">
                <Button onClick={() => setSelectedTab('Projects')} variant="ghost" className="cursor-pointer hover:bg-transparent hover:underline">
                  Projects
                </Button>
                <Button onClick={() => setSelectedTab('Content')} variant="ghost" className="cursor-pointer hover:bg-transparent hover:underline">
                  Content
                </Button>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-8 w-full px-10">
        <div className="flex gap-10">
          <div className="py-5">
            <h1 className="text-3xl font-bold pb-8">{selectedTab}</h1>
            <div className="border-2 border-dashed border-gray-200 rounded-lg min-h-96 h-fit p-4 min-w-fit">
              {selectedTab === 'Projects' ? (
                <ProjectsList />
              ) : (
                <ContentList />
              )}
            </div>  
          </div>
          <div className='w-full'>
            {selectedTab === 'Projects' ? (
              <ProjectsForm />
            ) : (
              <ContentForm />
            )}
          </div>
        </div>
      </main> 
    </div>
  )
}

export default Dashboard