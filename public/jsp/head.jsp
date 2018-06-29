<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>头部</title>
    <link rel="stylesheet" href="../css/head.css">
</head>

<body>
    <div class="head">
        <p>乡镇污水处理Aisacent人工智能系统运管平台</p>
        <div>
            <ul>
                <li>
                    <span class="headImg">
                        <img id="avatar" src="../images/head.png" alt="">
                    </span>
                </li>
                <li>
                    <span id="personName" class="welcome">欢迎您，admin！</span>
                </li>
                <li>|</li>
                <li>
                    <span>
                        <a id="test">个人中心</a>
                    </span>
                </li>
            </ul>
            <ul>
                <li class="headMessage">
                    <a>
                        <i></i>
                    </a>
                    <div class="point"></div>
                </li>
                <li class="headExplain">
                    <a>
                        <i></i>
                    </a>
                </li>
                <li class="headClose" state="0">
                    <i></i>
                </li>
            </ul>
        </div>
    </div>
    
    <input id="personId" type="hidden" value="${sessionScope.personId}">
    <script src="../js/jquery-3.2.1.min.js"></script>
    <script src="../js/head.js"></script>
</body>

</html>