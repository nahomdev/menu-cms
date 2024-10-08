export interface MenuItem {
    id: number;
    name: string;
    parentId: number | null;
    children: MenuItem[] | null;
  }
  
  export interface DropdownOption {
    value: string;
    label: string;
  }
  
  export interface RootState {
    menu: {
      items: MenuItem[];
    };
  }
  
  export interface AddMenuFormProps {
    parentMenu: string;
    depth: number;
    onAddMenu: (name: string) => void;
  }
  
  export interface MenuTreeProps {
    data: MenuItem[];
    onAddSubmenu: (parentId: number, parentName: string, depth: number) => void;
  }
  