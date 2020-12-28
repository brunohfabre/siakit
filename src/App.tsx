import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

import './index.css';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import GlobalStyle from './styles/global';

import Input from './components/Form/Input';
import InputMask from './components/Form/InputMask';
import Checkbox from './components/Form/Checkbox';
import Radio from './components/Form/Radio';
import DatePicker from './components/Form/DatePicker';
import DateRangePicker from './components/Form/DateRangePicker';
import Select from './components/Form/Select';
import Colors from './components/Form/Colors';
import Slider from './components/Form/Slider';
import Switch from './components/Form/Switch';

import Dropdown from './components/Dropdown';
import Tooltip from './components/Tooltip';
import Spin from './components/Spin';

import { Button } from './styles';

interface Errors {
  [key: string]: string;
}

const App: React.FC = () => {
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
        leitor: Yup.string().required('Campo obrigatorio'),
        testRadio: Yup.string().required('Campo obrigatorio'),
        appointment2: Yup.string().required('required'),
        daterange: Yup.string().required('required'),
        myselect: Yup.string().required('required'),
        print: Yup.string().test(
          'printTest',
          'nao e true',
          (value) => value === 'true',
        ),
        cor: Yup.string().required('required'),
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
    <>
      <GlobalStyle />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <section>
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
        </section>

        <section>
          <h3>input</h3>

          <Input name="name" label="Input" placeholder="Input" />
          <Input
            name="age"
            label="Input number"
            placeholder="Input number"
            type="number"
          />
        </section>

        <section>
          <h3>input mask</h3>

          <InputMask
            name="phone"
            placeholder="Input mask"
            mask="phone"
            label="Telefone"
          />
        </section>

        <section>
          <h3>checkbox</h3>

          <Checkbox
            name="leitor"
            options={[
              { id: '1', value: '1', label: 'Leitor?' },
              { id: '2', value: '2', label: 'Teste label' },
            ]}
          />
        </section>

        <section>
          <h3>radio</h3>

          <Radio
            name="testRadio"
            options={[
              { id: '2', value: '2', label: 'Verde' },
              { id: '3', value: '3', label: 'Laranja' },
              { id: '4', value: '4', label: 'Roxo' },
            ]}
          />
        </section>

        <section>
          <h3>date and range picker</h3>

          <DatePicker name="appointment2" label="Dia" />

          <DateRangePicker name="daterange" label="Periodo" />

          <button
            type="button"
            onClick={() => {
              formRef.current?.setFieldValue('datepicker', new Date());
            }}
          >
            alter date
          </button>
        </section>

        <section>
          <h3>select</h3>

          <Select
            name="myselect"
            label="Select"
            placeholder="Select"
            options={repositories.map((repository) => ({
              id: repository.id,
              label: repository.html_url,
            }))}
            // onChange={(value) => console.log(value)}
            loading={loading}
            next={() => {
              setPage(page + 1);
            }}
          />

          <Select
            name="myselect2"
            label="Select teste"
            placeholder="Select teste"
            options={[
              { id: '1', label: 'Bruno Fabre' },
              { id: '2', label: 'Vinicius Henrique' },
            ]}
            loading={loading}
            next={() => {
              setPage(page + 1);
            }}
          />

          <button
            type="button"
            onClick={() => {
              formRef.current?.setFieldValue('myselect', {
                id: 'vrau',
                label: 'Vinicius',
              });
            }}
          >
            set select data
          </button>

          <button
            type="button"
            onClick={() => {
              formRef.current?.setFieldValue('myselect2', {
                id: 'vrau',
                label: 'Teste',
              });
            }}
          >
            set select data 2
          </button>
        </section>

        <section>
          <h3>switch</h3>

          <Switch name="print" label="Impressora funcionando?" />
        </section>

        <section>
          <h3>colors</h3>

          <Colors name="cor" label="Escolha uma cor" />

          <button
            type="button"
            onClick={() => {
              formRef.current?.setFieldValue('cor', '#ff5722');
            }}
          >
            set color
          </button>
        </section>

        <section>
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
        </section>

        <section style={{ display: 'flex' }}>
          <Tooltip
            content="Este botao vai apagar o form carai"
            placement="right"
          >
            <button type="button">cancel</button>
          </Tooltip>
          <Tooltip content="Isso ae">
            <button type="submit">submit</button>
          </Tooltip>
        </section>

        <section>
          <h3>spin</h3>

          <div style={{ position: 'relative' }}>
            <Spin>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Ratione dicta officiis, temporibus et ipsam voluptatum est
                tenetur dolorem nostrum perferendis eligendi nulla vel omnis
                illo assumenda, ad, alias laboriosam. Suscipit.
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Ratione dicta officiis, temporibus et ipsam voluptatum est
                tenetur dolorem nostrum perferendis eligendi nulla vel omnis
                illo assumenda, ad, alias laboriosam. Suscipit.
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
        </section>
      </Form>
    </>
  );
};

export default App;
