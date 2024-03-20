export interface FeedPostProps {
    id:           string;
    name:         string;
    username:     string;
    profileImage: string;
    date:         string;
    like:         number;

    // comment: {
    //     value: {
    //         name:     string;
    //         username: string;
    //         value:    string;
    //     }[];
    // };

    content: {
        text:     string;
        imageUrl: string;
    }
};

export interface UserState {
    feedPost: FeedPostProps[];
    user: UserProps;
    isFetchingFeed: boolean;
    isUserLoggedIn: boolean;
    loginSwitch: boolean;
    loading: boolean;
}

export interface FeedPostPropsCard {
    props : {
        name: string;
        username: string;
        profileImage:string;
        date: string;
        content : {
            text:string;
            imageUrl:string;
        }
    }
}

export interface UserProps {
    id:              number;
    name:            string;
    username:        string;
    token:           string;
    profileImage: string;

    // friends?: {
    //     name:     string;
    //     username: string;
    //     id:       string;
    // }[];

};

export interface PostPropsPost {
              username: string;
              name: string;
              profileImage: string;
              content: {
                imageUrl:string;
                text: string;
              }
}