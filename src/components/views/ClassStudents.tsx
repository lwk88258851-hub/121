import React from 'react';
import { StatCard } from '../StatCard';
import { Users, LineChart as LineChartIcon, Search, Download } from 'lucide-react';
import { studentList } from '@/mock-data';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function ClassStudents() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">考试名称:</span>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-blue-500">
                <option>2024年春季期中考试</option>
            </select>
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">年级:</span>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-blue-500">
                <option>高一年级</option>
            </select>
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">班级:</span>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-blue-500">
                <option>高一(3)班</option>
            </select>
        </div>
        <div className="flex-1" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            生成分析
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          icon={<Users className="w-7 h-7" />} 
          title="总人数" 
          value="54" 
          color="blue"
        />
        <StatCard 
          icon={<LineChartIcon className="w-7 h-7" />} 
          title="班级均分" 
          value={<span className="text-emerald-500">78.6</span>} 
          color="emerald"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
      >
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-base font-semibold text-slate-800">学生成绩列表</h3>
              <div className="flex items-center space-x-3">
                  <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="搜索学生姓名" 
                        className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-md outline-none focus:border-blue-500 transition-colors w-48"
                      />
                  </div>
                  <button className="flex items-center space-x-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md text-sm transition-colors">
                      <Download className="w-4 h-4" />
                      <span>导出</span>
                  </button>
              </div>
          </div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 font-medium">
                      <tr>
                          <th className="py-3 px-6 text-center">排名</th>
                          <th className="py-3 px-6 text-center">姓名</th>
                          <th className="py-3 px-6 text-center">学号</th>
                          <th className="py-3 px-6 text-center">总分</th>
                          <th className="py-3 px-6 text-center">班级排名</th>
                          <th className="py-3 px-6 text-center">语文</th>
                          <th className="py-3 px-6 text-center">数学</th>
                          <th className="py-3 px-6 text-center">英语</th>
                          <th className="py-3 px-6 text-center">操作</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {studentList.map((student) => (
                          <tr key={student.id} className="hover:bg-blue-50/30 transition-colors">
                              <td className="py-3 px-6 text-center">{student.rank}</td>
                              <td className="py-3 px-6 text-center font-medium text-slate-700">{student.name}</td>
                              <td className="py-3 px-6 text-center">{student.id}</td>
                              <td className="py-3 px-6 text-center font-medium text-slate-800">{student.total}</td>
                              <td className="py-3 px-6 text-center">{student.classRank}</td>
                              <td className="py-3 px-6 text-center">{student.chinese}</td>
                              <td className="py-3 px-6 text-center">{student.math}</td>
                              <td className="py-3 px-6 text-center">{student.english}</td>
                              <td className="py-3 px-6 text-center">
                                  <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">查看</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 text-sm">
              <div className="text-slate-500">
                  共 54 条
              </div>
              <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-slate-500">
                      <select className="border border-slate-200 rounded px-2 py-1 outline-none bg-white">
                          <option>10条/页</option>
                      </select>
                  </div>
                  <div className="flex items-center space-x-1">
                      <button className="px-2 py-1 text-slate-400 hover:text-slate-600">&lt;</button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
                      <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-md">2</button>
                      <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-md">3</button>
                      <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-md">4</button>
                      <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-md">5</button>
                      <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-md">6</button>
                      <button className="px-2 py-1 text-slate-600 hover:text-slate-800">&gt;</button>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-500">
                      <span>前往</span>
                      <input type="text" defaultValue="1" className="w-10 text-center border border-slate-200 rounded py-1 outline-none focus:border-blue-500" />
                      <span>页</span>
                  </div>
              </div>
          </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 flex items-start space-x-4"
      >
        <div className="w-6 h-6 rounded-full bg-blue-600 flex flex-shrink-0 items-center justify-center mt-0.5 text-white font-bold text-xs">
            i
        </div>
        <div>
            <h4 className="font-semibold text-slate-800 mb-2 leading-none pt-1">使用说明</h4>
            <div className="space-y-1.5 text-sm text-slate-600">
                <p>1. 列表按总分从高到低排序，展示学生核心科目成绩及班级排名。</p>
                <p>2. 点击“查看”可进入学生详情页，查看该生各科目成绩明细及历次考试记录。</p>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
