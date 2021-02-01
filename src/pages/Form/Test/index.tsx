import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

import { Form, Input, TextArea } from '@components/Form';

import { useModal } from '../../../hooks/modal';

import { Container } from './styles';

const Test: React.FC = () => {
  const { addModal } = useModal();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((formData) => {
    console.log(formData);
  }, []);

  function handleClick2(): void {
    addModal({
      title: 'teste modal 2',
      content: () => (
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
          aliquid labore, illo molestiae facilis aperiam distinctio dolor
          voluptatum similique eum, tenetur saepe architecto. Aut facilis
          laborum sequi commodi distinctio pariatur!
        </div>
      ),
    });
  }

  function handleClick(): void {
    addModal({
      title: 'teste modal 1',
      content: () => (
        <div>
          sim
          <button type="button" onClick={handleClick2}>
            add
          </button>
        </div>
      ),
    });
  }

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

        <section style={{ justifyContent: 'flex-end' }}>
          <button type="button" onClick={handleClick}>
            modal
          </button>

          <button type="button" onClick={() => formRef.current?.submitForm()}>
            submit form
          </button>
        </section>
      </Form>
    </Container>
  );
};

export default Test;
