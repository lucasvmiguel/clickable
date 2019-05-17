import config from "./config";

export enum Icons {
  Like = 'like',
  Dislike = 'dislike',
  Feedback = 'feedback',
  Share = 'share',
};

export interface IOption {
  id: number;
  text: string;
  icon?: Icons;
}

export interface IConfig {
  global: boolean;
  breakpoints: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  }
  menu: { [key: string]: IOption[] };
}

export const getConfig = (apiKey: string): Promise<IConfig> => {
  return Promise.resolve({
    global: false,
    breakpoints: {
      mobile: true,
      tablet: false,
      desktop: true
    },
    menu: {
      default: [
        { id: 1, text: "Like", icon: Icons.Like, hook: 'https://whatever.com/{value}' },
        { id: 2, text: "Dislike", icon: Icons.Dislike },
        { id: 3, text: "Share", icon: Icons.Share },
      ],
      another: [
        { id: 3, text: "Share", icon: Icons.Share },
        { id: 4, text: "Feedback", icon: Icons.Feedback },
        { id: 5, text: "Another", icon: null },
      ]
    }
  })
};

export const sendClickItem = (id: string, value: string) => {
  return fetch(`${config.api.url}/options/${id}`, {
    method: 'put',
    body: JSON.stringify({ value })
  });
};