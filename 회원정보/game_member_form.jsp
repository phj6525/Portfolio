<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원 가입 페이지</title>
<style>
table {
	width: 500px; height: 700px; margin: auto; text-align: center; border: 1px solid #000000;
}
input {
	width: 300px; height: 50px; border: none; border-bottom: 1px solid rgba(0,0,0,0.7); padding-left: 20px; position: relative;
}
input::placeholder {
	opacity: 0.5;
}
button {
	width: 100px; height: 50px; background: #000000; color:#ffffff; font-size: 20px; font-weight: bold; border: 2px solid #000000; margin: 0 10px;
}
span {
	color: red;
}
</style>
</head>
<body>
<form action="game_member_register.jsp" method="post">
	<table>
		<tr>
			<td><span>*</span><input type="text" name="id" placeholder="ID"></td>
		</tr>
		<tr>
			<td><span>*</span><input type="text" name="password" placeholder="Password"></td>
		</tr>
		<tr>
			<td><span>*</span><input type="text" name="nickname" placeholder="Nickname"></td>
		</tr>
		<tr>
			<td><span>*</span><input type="text" name="name" placeholder="Name"></td>
		</tr>
		<tr>
			<td><input type="text" name="email" placeholder="E-mail"></td>
		</tr>
		<tr>
			<td colspan=2><button type="submit">확인</button><button type="reset">취소</button></td>
		</tr>
	</table>
</form>
</body>
</html>