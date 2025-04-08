import { useState } from 'react';
//import {nextId, setNextId} from '../../components/Post/data'

let nextId = 5;

export let postData = [
  {
    user: 'John',
    userimgsrc:
      'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png',
    categories: [''],
    title: '',
    text: "John's first post",
    isSaved: false,
    isSponsored: false,
    eventLink: '',
    shopLink: '',
    media: '',
    link: '',
    //replies:[],
    id: 0,
    timestamp: new Date('2025-03-12T14:48:00'),
  },
  {
    user: 'Olivia',
    userimgsrc:
      'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
    categories: [''],
    title: '',
    text: "Olivia's First Post",
    isSaved: false,
    isSponsored: true,
    eventLink: '',
    shopLink: '',
    media: '',
    link: '',
    //replies:[],
    id: 1,
    timestamp: new Date('2025-03-14T14:48:00'),
  },
  {
    user: 'Olivia',
    userimgsrc:
      'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
    categories: [''],
    title: 'This Fourth Post should have a lot of content',
    text: 'Lorem ipsum dolor sic amet. That comes from a corruption of a Roman text on morality. The Romans also had some wacky ideas about the Egyptians, including the idea that their worship of animals was to such a degree as to be more important than their very lives.',
    isSaved: false,
    isSponsored: false,
    eventLink: '',
    shopLink: '',
    media: '',
    link: '',
    //replies:[],
    id: 2,
    timestamp: new Date('2025-03-16T14:48:00'),
  },
  {
    user: 'Olivia',
    userimgsrc:
      'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
    categories: [''],
    title: 'This post has an image',
    text: "Here's some text about the image",
    isSaved: false,
    isSponsored: false,
    eventLink: '',
    shopLink: '',
    media:
      'https://media.4-paws.org/c/1/7/8/c178dd618346079f9b96edeacc30563b8de72fb4/Molly_006-2829x1886-2726x1886-1920x1328.webp',
    link: '',
    //replies:[],
    id: 3,
    timestamp: new Date('2025-03-18T14:48:00'),
  },
  {
    user: 'John',
    userimgsrc:
      'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png',
    categories: [''],
    title: '',
    text: 'This is another post by John, which has links',
    isSaved: false,
    isSponsored: false,
    eventLink: '',
    shopLink: '',
    media: '',
    link: 'https://ucalgary.ca',
    //replies:[],
    id: 4,
    timestamp: new Date('2025-03-20T14:48:00'),
  },
];

export function addPost(
  puser: string,
  puserimgsrc: string,
  pcategories: string[],
  ptitle: string,
  ptext: string,
  pisSaved: boolean,
  pisSponsored: boolean,
  peventLink: string,
  pshopLink: string,
  pmedia: string,
  plink: string,
  ptimestamp: Date,
  //replies:[Reply];
) {
  postData = [
    ...postData,
    {
      user: puser,
      userimgsrc: puserimgsrc,
      categories: pcategories,
      title: ptitle,
      text: ptext,
      isSaved: pisSaved,
      isSponsored: pisSponsored,
      eventLink: peventLink,
      shopLink: pshopLink,
      media: pmedia,
      link: plink,
      //replies:[Reply];
      id: nextId++,
      timestamp: ptimestamp,
    },
  ];

  //setNextId(nextId+1);
}

export function getPosts() {
  return postData.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
}

/*type PostProps = {
    user:string;
    userimgsrc:string;
    categories:[string];
    title: string;
    text:string;
    isSaved:boolean;
    isSponsored:boolean;
    eventLink:string;
    shopLink:string;
    media:string;
    link:string;
    //replies:[Reply];
    id:number;
  }

  type Reply = {
    user:string;
    text:string;
  }*/

/*export default function addPost(newpost : PostProps) {
    postData = [...postData, newpost]
}*/
//export const [postData,setPostData] = useState(initialPostData);
