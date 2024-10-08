"use client";
import React, { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { setMenuItems, addMenuItem } from "../store/menuSlice";
import Dropdown from "@/components/dropdown";
import MenuTree from "@/components/FolderTree";
import AddMenuForm from "@/components/addMenu";
import { fetchMenuItems, addMenuItem as addMenuItemApi } from "../services/api";
import { MenuItem } from "../types";

const queryClient = new QueryClient();

const options = [{ value: "System Management", label: "system_management" }];

function transformToNestedStructure(flatData: MenuItem[]): MenuItem[] {
  const idMap: { [key: number]: MenuItem } = {};
  const root: MenuItem[] = [];

  flatData.forEach((item) => {
    idMap[item.id] = { ...item, children: [] };
  });

  flatData.forEach((item) => {
    if (item.parentId === null) {
      root.push(idMap[item.id]);
    } else {
      idMap[item.parentId].children.push(idMap[item.id]);
    }
  });

  return root;
}

function HomeContent() {
  const dispatch = useDispatch();
  const menuStructure = useSelector((state: any) => state.menu.items);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [selectedParentName, setSelectedParentName] = useState<string>("");
  const [selectedDepth, setSelectedDepth] = useState<number>(0);

  const { data, isLoading, error, isSuccess } = useQuery<MenuItem[], Error>({
    queryKey: ["menuItems"],
    queryFn: fetchMenuItems,
  });

  const addMenuItemMutation = useMutation({
    mutationFn: (newItem: {
      name: string;
      parentId: number | null;
      id: string;
      depth: number;
    }) =>
      addMenuItemApi(newItem.name, newItem.parentId, newItem.id, newItem.depth),
    onSuccess: (data) => {
      console.log("New item added:", data);
      dispatch(addMenuItem(data));
      fetchMenuItems();
      queryClient.invalidateQueries(["menuItems"]);
    },
  });

  useEffect(() => {
    if (data) {
      const nestedData = transformToNestedStructure(data);
      dispatch(setMenuItems(nestedData));
    }
  }, [data, dispatch]);

  const handleAddSubmenu = (
    parentId: number,
    parentName: string,
    depth: number
  ) => {
    setSelectedParentId(parentId);
    setSelectedParentName(parentName);
    setSelectedDepth(depth + 1);
  };

  const addNewMenuItem = async (name: string, id: string, depth: number) => {
    // console.log("name ", name, "id ", id, "depth ", depth);
    if (selectedParentId !== null) {
      addMenuItemMutation.mutate({
        name,
        parentId: selectedParentId,
        id,
        depth,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="mx-12 my-12">
      <div className="flex items-center gap-2">
        <div className="px-4 py-4 rounded-full bg-blue-700">
          <RxDashboard size={24} color="white" />
        </div>
        <div className="text-2xl font-bold text-gray-800">Menus</div>
      </div>

      <div className="my-10 text-sm mb-2">Menu</div>
      <Dropdown
        options={options}
        onChange={(el: { value: string }) => {
          console.log(el.value);
        }}
      />

      <div className="mt-8 flex w-[70vw]">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-semibold mb-4">Menu Structure</h2>
          {menuStructure && (
            <MenuTree data={menuStructure} onAddSubmenu={handleAddSubmenu} />
          )}
        </div>
        <div className="w-1/2 pl-4">
          <AddMenuForm
            parentMenu={selectedParentName}
            depth={selectedDepth}
            onAddMenu={addNewMenuItem}
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HomeContent />
      </QueryClientProvider>
    </Provider>
  );
}
