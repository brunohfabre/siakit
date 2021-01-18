import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Spin from '@components/Spin';

import Input from '@components/Form/Input';
import InputMask from '@components/Form/InputMask';
import TextArea from '@components/Form/TextArea';
import Checkbox from '@components/Form/Checkbox';
import Radio from '@components/Form/Radio';
import DatePicker from '@components/Form/DatePicker';
import DateRangePicker from '@components/Form/DateRangePicker';
import Select from '@components/Form/Select';
import Colors from '@components/Form/Colors';
import Switch from '@components/Form/Switch';

import Dropdown from '@components/Dropdown';
import Tooltip from '@components/Tooltip';

import { Button } from './styles';

interface Errors {
  [key: string]: string;
}

const FormPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState<any[]>([]);

  const loadRepositories = useCallback(async () => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/search/repositories?q=java&per_page=10&page=${page}`,
      {
        headers: {
          Authorization: 'token 09a67ae8bb98e4f48418f03d984b3e01e8bc045b',
        },
      },
    );

    setRepositories([...repositories, ...response.data.items]);

    setLoading(false);
  }, [repositories, page]);

  useEffect(() => {
    loadRepositories();
  }, [page]);

  const handleSubmit = useCallback(async (data) => {
    try {
      console.log(data);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatorio'),
        age: Yup.string().required('Campo obrigatorio'),
        phone: Yup.string().required('Campo obrigatorio'),
        bio: Yup.string().required('Campo obrigatorio'),
        animals: Yup.string().required('Campo obrigatorio'),
        genre: Yup.string().required('Campo obrigatorio'),
        initialDate: Yup.string().required('Campo obrigatorio'),
        periodDate: Yup.string().required('Campo obrigatorio'),
        state: Yup.string().required('Campo obrigatorio'),
        print: Yup.string().test(
          'printTest',
          'nao e true',
          (value) => value === 'true',
        ),
        color: Yup.string().required('Campo obrigatorio'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const validationErrors: Errors = {};

      err.inner.forEach((error: { path: string; message: string }) => {
        validationErrors[error.path] = error.message;
      });

      formRef.current?.setErrors(validationErrors);
    }
  }, []);

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      initialData={{
        name: 'Bruno Henrique de Fabre',
        age: 23,
        phone: 19983262172,
        bio:
          'Engenheiro de Software, entusiasta de novas tecnologias e apaixonado por JavaScript e todo seu ecossistema.',
        animals: ['cat'],
        genre: 'm',
        initialDate: new Date(),
        periodDate: [new Date(), new Date()],
        state: 'SP',
        print: true,
        color: '#8bc34a',
      }}
    >
      {/* <section>
        <Dropdown
          options={[
            { id: '1', label: 'Bruno Henrique de Fabre' },
            { id: '2', label: 'Vinicius Henrique de Souza' },
          ]}
          onSelect={(value) => console.log(value)}
        >
          <button type="button">hoverable dropdown here</button>
        </Dropdown>
        <Dropdown
          isClickable
          options={[
            { id: '1', label: 'Bruno Henrique de Fabre' },
            { id: '2', label: 'Vinicius Henrique de Souza' },
          ]}
          onSelect={(value) => console.log(value)}
        >
          <button type="button">clickable dropdown here</button>
        </Dropdown>
      </section> */}

      <section>
        <h3>input</h3>

        <Input name="name" label="Nome completo" placeholder="Nome completo" />
        <Input name="age" label="Idade" placeholder="Idade" type="number" />
      </section>

      <section>
        <h3>input mask</h3>

        <InputMask
          name="phone"
          placeholder="Telefone"
          mask="phone"
          label="Telefone"
        />
      </section>

      <section>
        <h3>Textarea</h3>

        <TextArea name="bio" placeholder="Biografia" label="Biografia" />
      </section>

      <section>
        <h3>checkbox</h3>

        <Checkbox
          name="animals"
          label="Animais"
          options={[
            { value: 'dog', label: 'Cachorro' },
            { value: 'cat', label: 'Gato' },
            { value: 'bird', label: 'Passarinho' },
          ]}
        />
      </section>

      <section>
        <h3>radio</h3>

        <Radio
          name="genre"
          label="Genero"
          options={[
            { value: 'f', label: 'Feminino' },
            { value: 'm', label: 'Masculino' },
            { value: 'o', label: 'Outros' },
          ]}
        />
      </section>

      <section>
        <h3>date and range picker</h3>

        <DatePicker name="initialDate" label="Data de inicio" />

        <DateRangePicker name="periodDate" label="Periodo de datas" />
      </section>

      <section>
        <h3>select</h3>

        <Select
          name="state"
          label="Estado"
          placeholder="Estado"
          options={[
            { value: 'AC', label: 'Acre' },
            { value: 'AL', label: 'Alagoas' },
            { value: 'AP', label: 'Amapá' },
            { value: 'AM', label: 'Amazonas' },
            { value: 'BA', label: 'Bahia' },
            { value: 'CE', label: 'Ceará' },
            { value: 'DF', label: 'Distrito Federal' },
            { value: 'ES', label: 'Espírito Santo' },
            { value: 'GO', label: 'Goiás' },
            { value: 'MA', label: 'Maranhão' },
            { value: 'MT', label: 'Mato Grosso' },
            { value: 'MS', label: 'Mato Grosso do Sul' },
            { value: 'MG', label: 'Minas Gerais' },
            { value: 'PA', label: 'Pará' },
            { value: 'PB', label: 'Paraíba' },
            { value: 'PR', label: 'Paraná' },
            { value: 'PE', label: 'Pernambuco' },
            { value: 'PI', label: 'Piauí' },
            { value: 'RJ', label: 'Rio de Janeiro' },
            { value: 'RN', label: 'Rio Grande do Norte' },
            { value: 'RS', label: 'Rio Grande do Sul' },
            { value: 'RO', label: 'Rondônia' },
            { value: 'RR', label: 'Roraima' },
            { value: 'SC', label: 'Santa Catarina' },
            { value: 'SP', label: 'São Paulo' },
            { value: 'SE', label: 'Sergipe' },
            { value: 'TO', label: 'Tocantins' },
          ]}
        />
      </section>

      <section>
        <h3>switch</h3>

        <Switch name="print" label="Impressora funcionando?" />
      </section>

      <section>
        <h3>colors</h3>

        <Colors name="color" label="Cor preferida" />
      </section>

      {/* <section>
        <h3>slider</h3>

        <Slider name="slider" />

        <button
          type="button"
          onClick={() => {
            formRef.current?.setFieldValue('slider', 35);
          }}
        >
          set slider value
        </button>
      </section> */}

      <section style={{ display: 'flex' }}>
        <button type="button" onClick={() => formRef.current?.reset()}>
          clear form
        </button>
        <Tooltip content="Este botao vai apagar o form carai" placement="right">
          <button type="button">cancel</button>
        </Tooltip>
        <Tooltip content="Isso ae">
          <button type="submit">submit</button>
        </Tooltip>
      </section>

      {/* <section>
        <h3>spin</h3>

        <div style={{ position: 'relative' }}>
          <Spin>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              dicta officiis, temporibus et ipsam voluptatum est tenetur dolorem
              nostrum perferendis eligendi nulla vel omnis illo assumenda, ad,
              alias laboriosam. Suscipit.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              dicta officiis, temporibus et ipsam voluptatum est tenetur dolorem
              nostrum perferendis eligendi nulla vel omnis illo assumenda, ad,
              alias laboriosam. Suscipit.
            </p>
          </Spin>
        </div>

        <Button type="button" onClick={() => setIsLoading(!isLoading)}>
          {isLoading ? <Spin color="light" /> : 'Concluir'}
        </Button>

        <div
          style={{
            background: 'gray',
            width: 200,
            height: 200,
            display: 'flex',
          }}
        >
          <Spin color="light" />
        </div>
      </section> */}
    </Form>
  );
};

export default FormPage;
