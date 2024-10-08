import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface AddMenuFormProps {
  parentMenu: string;
  depth: number;
  onAddMenu: (name: string, id: string, depth: number) => void;
}

const AddMenuForm: React.FC<AddMenuFormProps> = ({
  parentMenu,
  depth,
  onAddMenu,
}) => {
  const [menuName, setMenuName] = useState("");
  const [menuId, setMenuId] = useState("");

  useEffect(() => {
    setMenuId(uuidv4());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMenu(menuName, menuId, depth);
    setMenuName("");
    setMenuId(uuidv4());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-4 flex flex-col gap-2 rounded-lg"
    >
      <div className="mb-2">
        <label className="block text-sm font-medium font-semibold text-gray-500">
          Menu Id
        </label>
        <input
          type="text"
          value={menuId}
          disabled
          className="mt-1 block w-full px-3 py-2 bg-[#eaecf0] rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium font-semibold text-gray-500">
          Depth
        </label>
        <input
          type="number"
          value={depth}
          disabled
          className="mt-1 block w-1/2 px-3 py-2 bg-[#eaecf0] rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium font-semibold text-gray-500">
          Parent Data
        </label>
        <input
          type="text"
          value={parentMenu}
          disabled
          className="mt-1 block w-1/2 px-3 py-2 bg-[#eaecf0] rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="menuName"
          className="block text-sm font-medium font-semibold text-gray-500"
        >
          Name
        </label>
        <input
          type="text"
          id="menuName"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          className="mt-1 block w-1/2 px-3 py-2 bg-[#eaecf0] rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-1/2 px-4 py-2 bg-[#253bff] text-sm py-3 font-semibold text-white rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Save
      </button>
    </form>
  );
};

export default AddMenuForm;
