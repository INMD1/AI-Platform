{children}은 하위 컴포먼트를 전달해주는 코드를 짤떄 쓰는거다

Lucide는 아이콘을 제공하는 프로그램이다. 

### openai
openAi가 버전이 올라감에 따라 CreateChatCompletionRequestMessage 대신 ChatCompletionMessageParam으로 써야합니다.

```js
 const [messages, setMessages] = useState<openai.ChatCompletionMessageParam[]>([])
```
