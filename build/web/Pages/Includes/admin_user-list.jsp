<%-- 
    Document   : admin_user-list
    Created on : Jun 20, 2024, 9:40:59 PM
    Author     : phamm
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="section table-responsive" id="user-list">
    <h3 class="title yellow-text">Current user list</h3>
    <div class="songs-display">
        <table class="songs-display__table user-list__table">
            <thead>
                <tr>
                    <th scope="col" style="width: 5%;">#</th>
                    <th scope="col" style="width: 10%;">Image</th>
                    <th scope="col" style="width: 10%;">Username</th>
                    <!--<th scope="col" style="width: 5%; ">Password</th>-->
                    <th scope="col" style="width: 20%;">Email</th>
                    <th scope="col" style="width: 20%;">Join date</th>
                    <th scope="col" style="width: 10%;">Role</th>
                    <th scope="col" style="width: 10%;">Promote</th>
                    <th scope="col" style="width: 10%;">Delete</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="u" items="${users}">
                    <c:if test="${u.isAdmin == true}">
                        <tr class="admin">
                            <th scope="row" class="uid">1</th>
                            <td class="userImg-mini">
                                <img src="${u.profilePicPath}" alt="User picture here" />
                            </td>
                            <td class="username">${u.username}</td>
                            <!--<td class="password">${u.password}</td>-->
                            <td class="email">${u.email}</td>
                            <td class="datejoined">${u.dateJoined}</td>
                            <td class="role">Admin</td>
                            <td class="delete" colspan="2">
                                <button onclick="handleRemoveUser(this)">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </td>

                        </tr>
                    </c:if>

                    <c:if test="${u.isAdmin == false}">
                        <tr class="user">
                            <th scope="row" class="uid">${u.userId}</th>
                            <td class="userImg-mini">
                                <img src="${u.profilePicPath}" alt="User picture here" />
                            </td>
                            <td class="username">${u.username}</td>
                            <!--<td class="password">${u.password}</td>-->
                            <td class="email">${u.email}</td>
                            <td class="datejoined">${u.dateJoined}</td>
                            <td class="role">User</td>
                            <td class="promote">
                                <button onclick="handlePromoteUser(this)">
                                    <i class="fa-solid fa-angles-up"></i>
                                </button>
                            </td>
                            <td class="delete">
                                <button onclick="handleRemoveUser(this)">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </td>
                        </tr>
                    </c:if>
                </c:forEach>




                <!--            <tr class="owner">
                                <th scope="row" class="uid">1</th>
                                <td class="userImg-mini">
                                    <img src="assets/images/demo.jpg" alt="User picture here" />
                                </td>
                                <td class="username">Pham Minh Kiet</td>
                                <td class="password">*********</td>
                                <td class="email">phamminhkiet24@gmail.com</td>
                                <td class="datejoined">24/08/2004</td>
                                <td class="role" colspan="3">Owner</td>
                            </tr>-->
            </tbody>
        </table>
    </div>

</div>
