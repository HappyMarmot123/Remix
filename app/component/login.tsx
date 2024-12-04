import { ActionFunction } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { useState } from "react";

export const action: ActionFunction = async ({ request }) => {
  // Remix의 action 함수는 서버 사이드에서만 실행되도록 설계되어 있어서 Index 컴포넌트 내부에 선언할 수 없습니다.
  // action 함수는 다음 HTTP 메소드들에서 실행됩니다:
  // POST
  // PUT
  // PATCH
  // DELETE

  const formData = await request.formData();

  // 서버 사이드에서 실행되는 action 함수의 콘솔 로그는 브라우저의 개발자 도구가 아닌 서버 터미널에서 확인해야 합니다.
  console.log(request);

  return null;
};

export default function Login() {
  const actionData = useActionData<typeof action>();

  // 클라이언트에서 디버깅 가능
  console.log("Form 제출 후 받은 데이터:", actionData);

  // 폼 제출 이벤트를 통한 디버깅
  const handleSubmit = (event: React.FormEvent) => {
    console.log(
      "폼 제출 전 데이터:",
      new FormData(event.currentTarget as HTMLFormElement)
    );
  };

  const [isInValid, setIsInValid] = useState(true);

  // every값의 반전값을 invalid에 저장합니다.
  const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
    const forms = Array.from(event.currentTarget.childNodes).filter(
      (node): node is HTMLInputElement => node instanceof HTMLInputElement
    );
    const isValid = forms.every((input) => input.checkValidity());
    setIsInValid(!isValid);
  };

  return (
    <section className="max-w-72 max-h-96 px-8 py-16 absolute inset-0 m-auto bg-white shadow-sm rounded-lg flex items-center justify-center">
      <Form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
        onChange={validateForm}
      >
        <label htmlFor="fuck1">email</label>
        <input
          type="email"
          id="fuck1"
          name="fuck1"
          required
          className="outline outline-1 rounded-sm"
        />
        <label htmlFor="fuck2">ID</label>
        <input
          type="text"
          id="fuck2"
          name="fuck2"
          required
          className="outline outline-1 rounded-sm"
        />
        <label htmlFor="fuck3">Password</label>
        <input
          type="text"
          id="fuck3"
          name="fuck3"
          required
          pattern="^(?=.*[a-z]).{5,}$"
          className="outline outline-1 rounded-sm"
        />
        <p className="text-[14px]">Password must be at least 5 characters</p>
        {/* tailwind의 disabled:는 true인 상태일 때 적용됩니다. */}
        <button
          type="submit"
          value="login"
          className="w-full bg-blue-500 text-white rounded-sm py-2 transition-opacity 
              opacity: 1; pointer-events: all; cursor: pointer;
              disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
          disabled={isInValid}
        >
          제출
        </button>
      </Form>
    </section>
  );
}
