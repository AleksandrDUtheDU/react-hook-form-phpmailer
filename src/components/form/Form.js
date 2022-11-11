import React from "react"
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'

const FormWrapp = styled.form`
    padding: 30px;
    width: 660px;
    margin-top: 60px;
    display: grid;
    grid-template: 45px 190px 45px / repeat(2, 1fr);
    justify-content: space-between;
    row-gap: 40px ;
    column-gap: 25px;
    position: relative;
    @media ${props => props.theme.media.notebook} {
        grid-template: 45px 190px 45px / repeat(2, 280px);
    }
    @media ${props => props.theme.media.phone} {
        grid-template: 45px 45px 190px / 300px;
    }
`

const WrappInput = styled.div`
    position:relative;
`

const Input = styled.input`
    padding: 20px 14px;
    width: 100%;
    height: 100%;
    border: 1px solid ${props => props.theme.colors.mainGreen};
    border-radius: 5px;
`

const Label = styled.label`
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: white;
    position: absolute;
    top: -12px;
    left: 12px;
    display: block;
    padding: 2px 8px;
    background: ${props => props.theme.colors.mainGreen};
    border-radius: 5px;
    margin: 0;
`

const WrappTextarea = styled.div`
    position:relative;
    grid-column: 1 / 3;
    @media ${props => props.theme.media.phone} {
        grid-column: unset;
    }
`

const Textarea = styled.textarea`
    padding: 20px;
    width: 100%;
    height: 190px;
    border: 1px solid ${props => props.theme.colors.mainGreen};
    border-radius: 5px;

    resize: none;
`

const TriggersBox = styled.div`
    grid-column: 1 / 3;
    display: grid;
    grid-template-columns: repeat(2, auto);
    column-gap: 35px;
    @media ${props => props.theme.media.phone} {
        grid-column: unset;
        grid-template-columns: 1fr;
        justify-content: center;
    }
`

const FormButton = styled.button`
    color: #FFFFFF;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;    
    padding: 11px 15px;
    height: 45px;
    background: ${props => props.color || props.theme.colors.mainGreen};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    border: none;
    &:hover {
        background: ${props => props.theme.colors.liteGreen};
        box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.288);
    }
`

const PoliticInput = styled.input`

    margin-right: 20px;
`

const PoliticTextBox = styled.div`
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
`

const PoliticLink = styled.a`
    color: #0645ad;
    &:hover {
        text-decoration: underline;
        color: #0645ad;
    }
`

const PoliticLabel = styled.label`
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;

`

const ErrorMessage = styled.span`
    color: #bf1650;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
`


function Form() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: "onBlur"
    });

    async function postData(data) {

        const enteries = Object.entries(data)
        const formData = new FormData(); // здесь мы преобразуем данные в формДату (так что бы из принял smart.php )
        enteries.forEach(entry => {
            formData.append(entry[0], entry[1])
        })

        const response = await fetch("smart.php", {
            method: 'POST',
            body: formData
        })

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Данные успешно отправлены',
                showConfirmButton: false,
                timer: 1500
            })
            reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: 'Пожайлуста, попробуйте еще раз!',
                showConfirmButton: false,
                timer: 3000
            })
        }

        return await response.json();
    }

    const onSubmit = (data) => {
        postData(data)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <FormWrapp noValidate onSubmit={handleSubmit(onSubmit)}>
            <WrappInput>
                <Input name="name" type="text" id="name" placeholder="Иван"
                    {...register("name", {
                        required: true,
                        maxLength: 30,
                        // pattern: /^[A-Za-z]+$/i
                    })}
                />
                {errors?.name?.type === "required" && <ErrorMessage>Это поле не заполнено</ErrorMessage>}
                {errors?.name?.type === "maxLength" && <ErrorMessage>Имя не может быть более 30 символов</ErrorMessage>}
                {/* {errors?.name?.type === "pattern" && <ErrorMessage>Имя не может содержать цифры</ErrorMessage>} */}
                <Label htmlFor='name'>Ваше имя</Label>
            </WrappInput>
            <WrappInput>
                <Input name="email" type="email" id="email" placeholder="example@site.com"
                    {...register("email", {
                        required: true,
                        // pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                    })}
                />
                {errors?.email?.type === "required" && <ErrorMessage>Это поле не заполнено</ErrorMessage>}
                {/* {errors?.mail?.type === "pattern" && <ErrorMessage>Это поле должно содержать E-Mail в формате example@site.com</ErrorMessage>} */}
                <Label htmlFor='email'>Ваша почта</Label>
            </WrappInput>
            <WrappTextarea>
                <Textarea name="text" type="text" id="text" placeholder="Ваше сообщение..."
                    {...register("text", {
                        required: true,
                        maxLength: 200
                    })}

                />
                {errors?.text?.type === "required" && <ErrorMessage>Это поле не заполнено</ErrorMessage>}
                {errors?.text?.type === "maxLength" && <ErrorMessage>Ваше сообщение не может быть более 200 символов</ErrorMessage>}
                <Label htmlFor='text'>Ваше сообщение</Label>
            </WrappTextarea>
            <TriggersBox>
                <FormButton>Отправить сообщение</FormButton>
                <PoliticTextBox>
                    <PoliticInput type="checkbox" id="checkbox" name="checkbox"
                        {...register("checkbox", {
                            required: true,
                            checked: true,
                            maxLength: 200
                        })}
                    />
                    <div>
                        <PoliticLabel htmlFor='checkbox' >Я согласен(а) с <PoliticLink href="/privacy">политикой конфиденциальности</PoliticLink></PoliticLabel>
                        <br />
                        {errors?.checkbox?.type === "required" && <ErrorMessage>Нужно принять политику конфиденциальности</ErrorMessage>}
                    </div>
                </PoliticTextBox>
            </TriggersBox>
        </FormWrapp>
    );
}

export default Form;
