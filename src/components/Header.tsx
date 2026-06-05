import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white/50 backdrop-blur-md ">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="text-slate-400 hover:text-slate-600 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="flex items-center space-x-3 cursor-pointer">
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=b6e3f4" 
            alt="User" 
            className="w-8 h-8 rounded-full bg-slate-200"
          />
          <span className="text-sm font-medium text-slate-700">张老师</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
