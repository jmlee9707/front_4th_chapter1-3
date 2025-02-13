## 과제 체크포인트

### 기본과제

- [x] shallowEquals 구현 완료
- [x] deepEquals 구현 완료
- [x] memo 구현 완료
- [x] deepMemo 구현 완료
- [x] useRef 구현 완료
- [x] useMemo 구현 완료
- [x] useDeepMemo 구현 완료
- [x] useCallback 구현 완료

### 심화 과제

- [x] 기본과제에서 작성한 hook을 이용하여 렌더링 최적화를 진행하였다.
- [x] Context 코드를 개선하여 렌더링을 최소화하였다.


## 과제 셀프회고

_25.01.03 작성_

이번 주차는 퇴사 직전 닥친 프로젝트 마감과 바쁜 업무로 시간이 너무나도 촉박했지만, 틈틈히 학습 자료를 읽으면서 과제를 제출하는 것을 목표로 하고 임했다.


과제를 하면서 생각해보니 React를 2년간 사용하면서 useMemo, useCallback을 고민하며 사용해본 적이 드물다는 것을 알았다.

또한 그동안 쓰던 hook, 사용하던 방식대로만 코드를 구현했고 React의 업데이트 내용을 많이 놓치고 있다는 생각이 들었다.


## 기술적 성장

- Context API의 이해
: 전역으로 상태관리를 하기 위해서 zustand, recoil 등의 상태관리 라이브러리만 사용해왔다. Context API 는 사용 경험도 없고 이해도 없었는데, 이번 기회에 공부할 수 있는 좋은 기회가 되었다.

  직접 사용해보면서 Provider의 역할을 명확히 이해할 수 있었다. Provider를 어디에 배치할지, 어떤 데이터와 메서드를 Context로 제공해야 할지 고민하는 것이 코드에 상당한 영향을 미친다는 것을 배웠다.
  
  typescript 환경에서 useContext를 사용하면서 Context를 초기 설정값이 중요하다는 것을 깨달았다. null 값이나 undefined로 처리하게 되면 이후 Context 를 불러오는 과정, 혹은 provider에서 빈 값에 대한 예외 처리를 해주어야 하거나, 타입 설정을 제대로 해줘야 문제가 없다는 것을 체감했다. 
  
  init 값을 제공하여 오류를 방지하는 방법이 좋을지, 혹은 null, undefined에 대한 예외처리를 추후에 해주는 것이 좋을지,, 이 부분은 아직도 고민 중이다. 
	
- useMemo `vs` useCallback의 차이 
: 그전에도 가장 어렵게 느껴졌던 hook 이였다. 이번 기회에 블로그 글, deep dive 책을 여러번 뒤적거리곤 했는데

  https://velog.io/@k-svelte-master/react-hook-real-knowledge

  이 분의 글처럼 나도 useMemo는 단순히 값을 기억하고, useCallback은 함수를 기억하는 hook 이라고 생각했다. 그리고 어떤 상황에서 사용해야 하는지, 이게 왜 성능 최적화를 위한 도구인지 잘 모르고 있었다. 이번 기회에 useCallback, useMemo 가 렌더링에 미치는 영향과 원리에 대해 이해할 수 있었다


 

- shallow Copy & Deep Copy 
: js 에서 얕은 복사, 깊은 복사를 다시 한번 돌아보고, memoization 구현 전 왜 shallowEquals, deepEquals 를 구현하는지, 어떤 상황에서 문제가 생기는 지 몸소 느끼게 되었다.

  특히 **spead ...** 가 완벽한 복사가 아니라는 점을 다시 한번 깨닫게 되었다.




## 과제 피드백

- 추가적으로 실제 프로젝트에서 성능 최적화를 고민하면서 useCallback과 useMemo를 활용해보고, 원리에 대한 공부가 더 필요할 것 같다. 


## 리뷰 받고 싶은 내용
1. typescript 를 사용할 떄 state 값을 null 혹은 undefinded로 설정하니, 예상치 못한 에러가 너무 많이 발생하는 듯 하여 initValue를 설정해주었습니다.

```ts
// AS-IS
// UserContext.ts
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
)

// ComplexForm.tsx
const { addNotification } = useContext(NotificationContext);
  const userContext = useContext(UserContext);
  if (!userContext) {
    console.error("No user data found");
    return null;
  }
  const { user } = userContext;
```

```ts
// TO-BE : init value 설정
const InitUserData = { id: 0, name: "", email: "" };
const UserData = {
  user: InitUserData,
  login: (email: string, password: string) => {
    console.warn(email, password, "error");
  },
  logout: () => {
    console.warn("error");
  },
};

export const UserContext = createContext<UserContextType>(UserData);

```

init 값을 설정해주니 login, logout 과 같은 함수의 경우 type에 억지로 맞추는 불필요한 코드란 생각도 들고, 어떤 방법이 더 좋은 방법인지 잘 모르겠습니다... 아니면 다른 더 좋은 방법이 있을까 궁금합니다.

