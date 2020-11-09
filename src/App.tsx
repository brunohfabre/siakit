import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const scrollObserve = useRef<HTMLDivElement>(null);

  const [scrollRadio, setScrollRadio] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState<any[]>([]);

  const intersectionObserver = new IntersectionObserver((entries) => {
    const radio = entries[0].intersectionRatio;

    setScrollRadio(radio);
  });

  useEffect(() => {
    if (scrollObserve.current) {
      intersectionObserver.observe(scrollObserve.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  const loadRepositories = useCallback(async () => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/search/repositories?q=java&per_page=10&page=${page}`,
      {
        headers: {
          Authorization: 'token 5db13b4bc1eb0b7a431a85bf04a600ac33e1d639',
        },
      },
    );

    setRepositories([...repositories, ...response.data.items]);
    // setLoading(false);
  }, [page, repositories]);

  console.log(repositories);

  useEffect(() => {
    if (scrollRadio > 0 && !loading) {
      loadRepositories();
    }
  }, [page, loadRepositories, scrollRadio, loading]);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatorio'),
        age: Yup.string().required('Campo obrigatorio'),
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
          <h3>input</h3>

          <Input name="name" label="Nome completo" placeholder="Placeholder" />
          <Input
            name="age"
            label="Idade"
            placeholder="Placeholder"
            type="number"
          />
        </section>

        <section>
          <h3>input mask</h3>

          <InputMask name="phone" mask="phone" />
          <button
            type="button"
            onClick={() => {
              formRef.current?.setFieldValue('phone', '18997812225');
            }}
          >
            set input mask value
          </button>
        </section>

        <section>
          <h3>checkbox</h3>

          <Checkbox
            name="leitor"
            options={[{ id: '1', value: '1', label: 'Leitor?' }]}
          />
        </section>

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
          <h3>radio</h3>

          <Radio
            name="teste"
            options={[
              { id: '2', value: '2', label: 'Verde' },
              { id: '3', value: '3', label: 'Laranja' },
              { id: '4', value: '4', label: 'Roxo' },
            ]}
          />
        </section>

        <section>
          <h3>date and range picker</h3>

          <DatePicker name="appointment2" />

          <DateRangePicker name="daterange" />

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
            options={[
              { id: '1', label: 'Bruno Fabre' },
              { id: '2', label: 'name 2' },
              { id: '3', label: 'name 3' },
              { id: '4', label: 'name 4' },
              { id: '5', label: 'name 5' },
              { id: '6', label: 'name 6' },
            ]}
            onChange={(value) => console.log(value)}
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
        </section>

        <section>
          <h3>colors</h3>

          <Colors name="cor" />

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

        <section>
          <h3>switch</h3>

          <Switch name="switch" label="Impressora funcionando?" />

          <button
            type="button"
            onClick={() => {
              formRef.current?.setFieldValue('switch', true);
            }}
          >
            set switch to true
          </button>

          <button
            type="button"
            onClick={() => {
              formRef.current?.setFieldValue('switch', false);
            }}
          >
            set switch to false
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
          <div ref={scrollObserve} style={{ display: 'block' }} />
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

        <hr style={{ margin: '32px 0' }} />

        <section>
          <h3>Infinite scroll</h3>

          {repositories.map((repository) => (
            <div style={{ display: 'flex' }}>
              <img
                src={repository.owner.avatar_url}
                alt=""
                style={{ width: 100, height: 100 }}
              />

              <div>
                <td>
                  <a href={repository.html_url}>{repository.html_url}</a>
                </td>
                <td>{repository.stargazers_count}</td>
              </div>
            </div>
          ))}

          <Spin />
        </section>
      </Form>
    </>
  );
};

export default App;
