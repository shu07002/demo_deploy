import { instance } from 'api/instance';
import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from 'types/user';

interface YesEmailFormProps {
  updateFormData: (field: keyof User, value: any) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  email: string;
}

export default function YesEmailForm({
  updateFormData,
  setStep,
  email
}: YesEmailFormProps) {
  const [code, setCode] = useState<string>();
  const [certified, setCertified] = useState<boolean>(false);

  const onClickSendCode = async () => {
    const dataToSend = { email: email, college: '서강대학교' };
    console.log(dataToSend);
    try {
      const response = await instance.post('user/email', dataToSend);
      console.log(response.status);

      if (response.status === 200) {
      }
    } catch (err) {
      console.log('Error Occured');
    }
  };

  const onClickSubmit = async () => {
    const dataToSend = { email: email, college: '서강대학교' };
    try {
      const response = await instance.post(
        'user/univcert/register',
        dataToSend
      );

      if (response.status === 200) {
        console.log(response.data);
        /*코드 인증할때 왜 부가적인 정보가 필요되는지??? 비번, 닉네임, 기타 등등*/
      }
    } catch (err) {
      console.log('Error Occured');
    }
  };

  const onClickNextButton = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <YesEmailFormContainer>
      <CertifyBox>
        <EmailContainer>
          <p>Sogang University E-mail Address (ID)</p>
          <input
            type="email"
            onChange={(e) =>
              updateFormData('email', e.target.value + '@sogang.ac.kr')
            }
          />
          <span> @sogang.ac.kr </span>
          <button onClick={onClickSendCode}>send code</button>
        </EmailContainer>

        <CertifyCodeContainer $certified={certified}>
          <p>Code</p>
          <input type="text" onChange={(e) => setCode(e.target.value)} />
          <button onClick={onClickSubmit}>submit</button>
          <span>{certified ? 'completed' : 'uncompleted'}</span>
        </CertifyCodeContainer>
      </CertifyBox>

      <ButtonBox>
        <NextButton
          $certified={certified}
          disabled={!certified}
          onClick={onClickNextButton}
        >
          Next
        </NextButton>
      </ButtonBox>
    </YesEmailFormContainer>
  );
}

const YesEmailFormContainer = styled.div``;

const CertifyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem;
  width: 50rem;
  height: 30rem;
  background: white;
`;

const EmailContainer = styled.div`
  > p {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  > input {
    padding: 0.5rem;
  }

  > span {
    font-size: 1.2rem;
    margin-right: 2rem;
  }
`;

const CertifyCodeContainer = styled.div<{ $certified: boolean }>`
  > p {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  > input {
    margin-right: 2rem;
    padding: 0.5rem;
  }

  > button {
    margin-right: 2rem;
  }

  > span {
    font-size: 1.2rem;
    color: ${(props) => (props.$certified ? 'blue' : 'red')};
  }
`;

const ButtonBox = styled.div`
  margin: 5rem 0;
  display: flex;
  justify-content: center;
`;

const NextButton = styled.button<{ $certified: boolean }>`
  width: 10rem;
  height: 5rem;
  font-size: 2rem;
  background: ${(props) =>
    props.$certified ? 'var(--vertical-gradient)' : ''};
  color: ${(props) => (props.$certified ? 'white' : '')};
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  cursor: ${(props) => (props.$certified ? 'pointer' : '')};
`;
