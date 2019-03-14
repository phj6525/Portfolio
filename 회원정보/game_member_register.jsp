<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>

<%
	request.setCharacterEncoding("utf-8");

	String i = request.getParameter("id");
	String pswd = request.getParameter("password");
	String nnm = request.getParameter("nickname");
	String nm = request.getParameter("name");
	String eml = request.getParameter("email");

	String url = "jdbc:mariadb://localhost:3306/game";
	String user = "root";
	String pw = "gudwns7748";

	Connection con = null;
	Statement stmt = null;
	int res = 0;
	String query = "INSERT INTO game.user (`id`, `password`, `nickname`, `name`, `email`) VALUES('" + i + "','"
			+ pswd + "','" + nnm + "','" + nm + "','" + eml + "')";

	try {
		con = DriverManager.getConnection(url, user, pw);
		stmt = con.createStatement();
		res = stmt.executeUpdate(query);
	} catch (Exception e) {
		out.print(e);
	} finally {
		if (con != null)
			try {
				con.close();
			} catch (Exception e) {
				out.print(e);
			}
		if (stmt != null)
			try {
				stmt.close();
			} catch (Exception e) {
				out.print(e);
			}
		response.sendRedirect("game_member_list.jsp");
	}
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
</html>