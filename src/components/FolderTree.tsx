import React, { useState } from "react";
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";

interface MenuItem {
  id: number;
  name: string;
  children: MenuItem[];
}

interface MenuTreeProps {
  data: MenuItem[];
  onAddSubmenu: (parentId: number, parentName: string, depth: number) => void;
  level?: number;
}

const MenuTree: React.FC<MenuTreeProps> = ({
  data,
  onAddSubmenu,
  level = 0,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="pl-4">
      {data.map((item, index) => (
        <div key={item.id} className="relative">
          {level > 0 && (
            <div
              className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"
              style={{ left: "-16px" }}
            />
          )}
          {index < data.length - 1 && (
            <div
              className="absolute left-0 top-6 bottom-0 w-px bg-gray-300"
              style={{ left: "-16px" }}
            />
          )}
          <div className="flex items-center py-2">
            {level > 0 && (
              <div
                className="absolute w-4 h-px bg-gray-300"
                style={{ left: "-16px" }}
              />
            )}
            {item.children && item.children.length > 0 && (
              <button
                onClick={() => toggleExpand(item.id)}
                className="mr-2 text-gray-500"
              >
                {expandedItems.has(item.id) ? (
                  <FaChevronDown size={12} />
                ) : (
                  <FaChevronRight size={12} />
                )}
              </button>
            )}
            <span className="font-medium">{item.name}</span>
            <button
              onClick={() => onAddSubmenu(item.id, item.name, level)}
              className="ml-2  px-1 py-1 rounded-full bg-blue-600"
            >
              <FaPlus size={13} className="text-white hover:text-blue-500" />
            </button>
          </div>
          {expandedItems.has(item.id) &&
            item.children &&
            item.children.length > 0 && (
              <MenuTree
                data={item.children}
                onAddSubmenu={onAddSubmenu}
                level={level + 1}
              />
            )}
        </div>
      ))}
    </div>
  );
};

export default MenuTree;
