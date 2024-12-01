# Remix

Remix는 React 기반으로 구축되어 있으므로 리액트의 상태 관리 및 생명주기를 그대로 활용할 수 있습니다.  
데이터 로딩과 캐싱 최적화를 지원합니다.  
코드 분할 lazy 최적화를 지원합니다.  
경로기반 라우팅, 동적 경로 지원을 지원합니다.  
설치 시 React, Vite, Tailwind를 디폴트로 제공합니다.

## Remix, Next에 대한 마멋의 개인적 견해

Next.js의 단점: 조건적 SSR, 복잡하고 난해하게 만듬, 생각보다 많이 느림 (성능 안좋음) 😭😭  
Next.js에서 서버사이드 렌더링을 하려면 리액트 훅을 사용할 수 없습니다. 🗿          
사용 메리트가 뒤쳐지는 프레임워크입니다.  

Remix는 React Router를 개발한 팀에서 만들었습니다. 리액트에 대한 이해도가 Vercel보단 위에 있어요.    
Remix는 리액트 훅을 사용함과 동시에 SSR를 지원하도록 만들었습니다.  
Remix는 아직 한국 개발시장에서 많이 알려지지 않았어요. 심지어 유투브 강의 영상도 없답니다.  
꾸준한 업데이트와 Facebook 리액트 팀의 서포팅만 있다면 Next를 금방 뛰어 넘을것 같아요.

## Remix SSR 🤩

컴포넌트를 SSR로 처리하기 위해서는 해당 페이지를 라우트 파일로 사용해야 하며, 컴포넌트를 (export) 내보내야 합니다.    
Remix는 SSR 처리를 자동으로 해주기 때문에 페이지 상단에 'use client'와 같은 키워드를 선언할 필요가 없습니다. 🔥    

Remix는 **loader** 키워드를 제공합니다.      
이것은 서버 측에서 데이터를 먼저 가져오고, 해당 데이터를 기반으로 페이지를 렌더링합니다.      

export let loader: LoaderFunction = async () => {
  return json({ message: 'Hello from loader' });
};

export default function Index() {
  const data = useLoaderData();
}
