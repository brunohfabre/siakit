import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Input from '@components/Form/Input';
import TextArea from '@components/Form/TextArea';

import { Container } from './styles';

const Test: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((formData) => {
    console.log(formData);
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <section>
          <Input
            name="firstName"
            label="Primeiro nome"
            placeholder="Primeiro nome"
          />
          <Input
            name="lastName"
            label="Ultimo nome"
            placeholder="Ultimo nome"
          />
          <Input
            name="age"
            label="Idade"
            type="number"
            placeholder="Idade"
            width="100px"
          />
        </section>
        <section>
          <Input
            name="username"
            label="Nome de usuario"
            placeholder="Nome de usuario"
          />
          <Input name="email" label="Email" placeholder="Email" />
        </section>
        <section>
          <TextArea name="bio" label="Biografia" placeholder="Biografia" />
        </section>
      </Form>

      <button type="button" onClick={() => formRef.current?.submitForm()}>
        submit form
      </button>
    </Container>
  );
};

export default Test;
