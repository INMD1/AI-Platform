# Routing 
nextjs에서는 파일을 생성하면 자동으로 경로가 설정되서 아래 처럼 하면 됨니다.

```
Index Routes

pages/index.js → /
pages/blog/index.js → /blog

Nested Routes
pages/blog/first-post.js → /blog/first-post
pages/dashboard/settings/username.js → /dashboard/settings/username

Dynamic Routes
pages/blog/[slug].js → /blog/:slug (/blog/hello-world)
pages/[username]/settings.js → /:username/settings (/foo/settings)
pages/post/[...all].js → /post/* (/post/2020/id/title)
```

router 객체를 사용할 경우 useRouter라는 훅을 이용하면 됨니다.
페이지간 연결은 `Link`을 사용하면 쓸수 있습니다.

## 동적 라우팅
동적 라우팅 같은 경우는 파일이름명을 [name]이라고 작성해야 합니다.

## next/link
LINK는 `react-router-dom`처럼 비슷하게 쓸수 있습니다.
```
import Link from 'next/link'
const function test(){
    return(
        <link ...>
    )
}
```
<br>
<br>
href(필수) : 이동할 경로 또는 URL<br>
as : 브라우저 URL 표시 줄에 표시 될 경로<br>
passHref : 기본값은 false로, Link가 href 속성을 child에게 보낸다.<br>
prefetch : 기본값은 true로, 백그라운드에서 페이지를 미리 가져온다.<br>
 뷰포트에 있는 모든 항목이 미리 로드 되며, prefetch={false}을 전달하여 비활성화 할 수 있다.<br>
false 여도 마우스를 hover 하면 프리페치가 계속 발생한다.<br>
정적 생성을 사용하는 페이지는 더 빠른 페이지 전환을 위해 데이터와 함께 JSON 파일을 미리 로드한다. 프리 페치는 프로덕션에서만 활성화된다.<br>
replace : 기본값은 false로, history 스택에 새 URL을 추가하지 않고 현재 상태만 교체한다.<br>
scroll : 기본값은 true로 페이지 이동 후 상단으로 스크롤한다.<br>
shallow : 기본값은 false로 getStaticProps, getServerSideProps, getInitialProps 를 실행하지 않고 현재 페이지의 경로를 업데이트한다.<br>
locale : 활성 locale 이 자동으로 앞에 추가된다.

## next/route
react-router-dom의 useLocation useHistory(v6부터 useNavigate)의 기능을 Next js에서는 'next/router'의 useRouter 로 구현할 수 있습니다.

pathname : string : 현재 경로로 /pages 의 페이지 경로이며(파일명), basePath 또는 locale 은 포함되지 않는다.<br>
query : object : 동적 라우트 매개변수를 포함하는 객체로 구문 분석된 쿼리 문자열<br>
asPath : string : basePath 또는 locale 없이 브라우저에 표시되는 경로(query 포함)<br>
isFallback : boolean : 현재 페이지의 fallback 모드 여부<br>
basePath : string : 활성화된 basePath<br>
locale : string : 활성화된 locale<br>
locales : string[] : 지원되는 모든 locale<br>
isReady : boolean : 라우터 필드가 클라이언트 측에서 업데이트되고 사용할 준비가 되었는지 여부. useEffect 메소드 내에서만 사용해야하며 서버에서 조건부로 렌더링 하는 데에 사용해야 한다.<br>
isPreview : boolean : 애플리케이션의 미리보기 모드 여부<br>

### router.push
router.push는 react-router-dom의 useNavigate과 유사한 기능과 유서하다.
```
import { useRouter } from 'next/router';
router.push(url, as, options)
```
## 리액트에서는?
리액트에서는 `react-router-dom`을 사용하지만 동적라우팅을 사용시 :(콜론)을 사용하여 값을 설정해야 합니다.