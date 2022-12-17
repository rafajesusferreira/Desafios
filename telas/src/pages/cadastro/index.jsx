import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPerson, MdPhone } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";

import { Container, Title, Column, TitleCadastro, SubtitleCadastro, EsqueciText, CriarText, Row, Wrapper } from './styles';

const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleCadastro>Comece agora grátis!</TitleCadastro>
                <SubtitleCadastro>Faça seu cadastro & make the change!</SubtitleCadastro>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Seu nome completo" leftIcon={<MdPerson />} name="nome" control={control} />
                    <Input placeholder="Seu melhor @E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input placeholder="Contato ex.: (XX) X XXXX-XXXX" leftIcon={<MdPhone />} name="número de contato" control={control} />
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Faça seu cadastro grátis" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <EsqueciText>Esqueci minha senha</EsqueciText>
                    <CriarText>Criar Conta</CriarText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }