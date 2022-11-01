<?php 

$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];
$checkbox = $_POST['checkbox'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                            // Enable verbose debug output

$mail->isSMTP();                                    // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  					// https://support.google.com/mail/answer/7126229?hl=ru ИНСТРУКЦИЯ
$mail->SMTPAuth = true;                             // Enable SMTP authentication
$mail->Username = 'username@gmail.com';       		// !!! Логин
$mail->Password = '************';               	// !!! Пароль для приложения https://support.google.com/accounts/answer/185833?hl=ru ИНСТРУКЦИЯ
$mail->SMTPSecure = 'ssl';                          // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                  // TCP port to connect to
 
$mail->setFrom('username@gmail.com', 'form-php');   		// !!! От кого письмо 
$mail->addAddress('username_2@gmail.com');     				// !!! Кому письмо
//$mail->addAddress('ellen@example.com');               	// Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         	// Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    	// Optional name
$mail->isHTML(true);                                  		// Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
	Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Сообщение: ' . $text . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>