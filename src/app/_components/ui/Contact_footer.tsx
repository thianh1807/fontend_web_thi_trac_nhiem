
import React from 'react';

export default function Contact_footer({contact}: any) {
    if(contact.length === 0) return [];
  return (
    <div className="col-span-1">
            <h2 className="text-base lg:text-lg font-bold mb-4 lg:mb-6 flex items-center">
              <span className="inline-block w-2 h-2 bg-blue-500 mr-2"></span>
              {contact.header}
            </h2>
            <ul className="space-y-3 lg:space-y-4 text-gray-400 text-sm lg:text-base">
              {contact.Information.map((item: any, index: number) => (
                <li className="hover:text-white transition-colors" key={index}>
                  <span className="block font-semibold">{item.label}</span>
                  <span>{item.content}</span>
                </li>
              ))}
            
            </ul>
    </div>
  )
}
