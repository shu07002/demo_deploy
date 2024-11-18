import React, { useState } from 'react';
import styled from 'styled-components';
import YesEmailForm from './YesEmailForm';
import NoEmailForm from './NoEmailForm';
import { User } from 'types/user';

interface SelfCertificationProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  updateFormData: (field: keyof User, value: any) => void;
}

export default function SelfCertification({
  setStep,
  updateFormData
}: SelfCertificationProps) {
  const [haveEmail, setHaveEmail] = useState<boolean | null>(null);

  return (
    <SelfCertificationContainer>
      <p>② Self-Certification</p>

      {haveEmail === null ? (
        <>
          <Form>{'Do you have Sogang University E-mail address?'}</Form>

          <ButtonContainer>
            <button onClick={() => setHaveEmail(true)}>Yes</button>
            <button onClick={() => setHaveEmail(false)}>No</button>
          </ButtonContainer>
        </>
      ) : haveEmail === true ? (
        <YesEmailForm updateFormData={updateFormData} setStep={setStep} />
      ) : (
        <NoEmailForm updateFormData={updateFormData} setStep={setStep} />
      )}
    </SelfCertificationContainer>
  );
}

const SelfCertificationContainer = styled.div`
  > p {
    font-family: var(--main-font);
    font-size: 2rem;
    margin: 1rem 0;
  }
`;

const Form = styled.div`
  white-space: pre-wrap;
  width: 50rem;
  height: 30rem;
  background: white;
  overflow-y: auto;
  padding: 2rem;
  font-size: 2rem;
  margin: 1rem 0;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align:center

  border: 1px solid var(--border-color);
  color: var(--secondary-text);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: Center;
  gap: 2rem;
  margin: 3rem 0;

  > button {
    width: 10rem;
    height: 5rem;
    font-size: 2rem;

    border-radius: 0.5rem;
    border: 1px solid var(--border-color);

    background: var(--vertical-gradient);
    color: white;

    cursor: pointer;

    &: hover {
      opacity: 0.8;
    }

    transition: opacity 0.3s ease;
  }
`;