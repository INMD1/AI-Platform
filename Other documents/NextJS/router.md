>오늘은 내가 격으면서 오류가 발생한 `useRouter`에 대해 알아보자

## useRouter?

라우터를 사용시 입력하게 되는 훅(hook)입니다.

### useRouter.push(href: string, { scroll: boolean })
다른페이지를 이동할때 쓰이고 Next/Link대신 사용할수 있습니다.
> [History API]("https://developer.mozilla.org/ko/docs/Web/API/History_API")에 히스토리 스택에 쌓아줌니다.

외부 링크를 이동할때는 적합하지 않기 때문에 외부로 이동시 a tag의 target="_blank" 를 사용하거나 window.location을 사용하는 것이 낫습니다.

### use.replace(href: string, { scroll: boolean })

이것도 위에 있는 `push`처럼 작동을 하지만 히스토리 스택에 추가가 되지 않습니다.

> push는 히스토리 제일 위해 스택을 쌓는 것이고 replace는 제일 위에 있는 스택을 변경하는 것이니 상황에 따라 적절이 사용하면 됨니다.

### useRouter.refresh()
현재 페이지를 새로고침하는 동시에 서버에 새 요청을 보내고 서버에서는 변경된 데이터와 구성요소를 다시 랜더링 해서 보내줌니다.


### useRouter.prefetch(href: string)
미리 경로를 가지고 오는 것입니다.

### useRouter.back()
브라우저 기록에 있는 이전 페이지로 이동합니다.

### useRouter.forward()
브라우저 기록에 있는 다음 페이지로 이동합니다.

### Error: NextRouter was not mounted. https://nextjs.org/docs/messages/next-router-not-mounted

우리가 페이지에서 개발하고 있을때 useRouter를 입력하는 순간 이런 오류가 나올수 있는데 이건 이전버전에서는 Next/Router에서 쓸수 있었지만 지금 nextjs에서는 Next/navigation으로 쓸수가 있기때문에 오류가 발생하면 import를 보고 수정하면 된다.

```js
import { useRouter } from "next/navigation";
```