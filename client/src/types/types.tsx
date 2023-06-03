export interface ApiRequestRegister {
  img?: any;
  adminPassword?: string | undefined;
  username: string;
  email: string;
  password: string;
  ethereum_address: string;
  role: "" | "user" | "admin";
  [key: string]: any;
}

export interface ApiRequestLogin {
  email: string;
  password: string;
}

export interface User {
  img: any;
  username: string;
  email: string;
  ethereum_address: string;
  role: "" | "user" | "admin";
  token: string;
  _id: string;
  blogs: Blog[];
  [key: string]: any;
}

export interface FormProps {
  isLogin: boolean;
}

export interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
    img: any;
  };
  comment: string;
}

export interface Blog {
  title: string;
  Author?: string;
  date: Date;
  content: string;
  tags?: string[];
  comments?: Comment[];
  _id: string;
  img: any;
}

export interface BlogReturn {
  title: string;
  author: {
    email: string;
    ethereum_address: string;
    img: any;
    _id: string;
    username: string;
  };
  content: string;
  date: Date;
  tags: string[];
  img: any;
  comments: Comment[];
  _id: string;
}

export interface LeftRecentProps {
  title: string;
  author: {
    _id: string;
    username: string;
  };
  content: string;
  date: Date;
  tags: string[];
  img: any;
  id: string;
}

export interface ProfileBlog {
  _id: string;
  title: string;
  date: Date;
  tags: string[];
  img: any;
}

export type SingleBlogProps = {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  img: any;
  title: string;
  date: Date;
  index: number;
  tags?: string[];
  id: string;
};

export interface AppState {
  app: {
    user: {
      _id: null | string;
      username: null | string;
      email: null | string;
      ethereum_address: null | string;
      role: null | string;
      img: any;
      isLoggedIn: boolean;
      error: null | string;
      token: null | string;
    };
  };
}

export interface Values {
  username: string;
  img: any;
  email: string;
  password: string;
  ethereum_address: string;
  [key: string]: any;
}

export interface FormFieldProps {
  name: string;
  placeholder: string;
  type: "text" | "email" | "password";
}

export type MyFormValues = {
  comment: string;
};

export interface ValuesBlogType {
  title: string;
  content: string;
  img: any;
  tags?: string[];
  [key: string]: any;
}

export interface DeleteProps {
  id: string | undefined;
}

export interface MenuProps {
  menuRef: React.RefObject<HTMLDivElement>;
}
