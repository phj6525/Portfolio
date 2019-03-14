<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원 목록 페이지</title>
<style>
table {
	width: 1200px; margin: auto;
}
td {
	width: 200px; height: 30px;
}
</style>
</head>
<body>
<table>
	<tr>
		<td>No</td>
		<td>ID</td>
		<td>Password</td>
		<td>Nickname</td>
		<td>Name</td>
		<td>E-mail</td>
	</tr>
	<%
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		String url = "jdbc:mariadb://localhost:3306/game";
		String user = "root";
		String pw = "gudwns7748";
		try {
			con = DriverManager.getConnection(url, user, pw);
			stmt = con.createStatement();
			rs = stmt.executeQuery("SELECT * FROM user");
			while (rs.next()) {
				out.print("<tr>");
				out.print("<td>" + rs.getString("no") + "</td>");
				out.print("<td>" + rs.getString("id") + "</td>");
				out.print("<td>" + rs.getString("password") + "</td>");
				out.print("<td>" + rs.getString("nickname") + "</td>");
				out.print("<td>" + rs.getString("name") + "</td>");
				out.print("<td>" + rs.getString("email") + "</td>");
				out.print("</tr>");
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	%>
</table>
</body>
</html>