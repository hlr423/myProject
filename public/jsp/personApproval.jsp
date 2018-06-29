<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>个人中心/审批</title>
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/personApproval.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>

    <div class="body-wrapper">
        <div id="tab" class="easyui-tabs">
            <div title="发起审批" class="approval-go-tab">
                <p>申请(2)</p>
                <div class="approval-go">
                    <div class="approval-leave">
                        <img src="<%=basePath%>front/public/images/approval-leave.png" alt="">
                    </div>
                    请假
                </div>
                <div class="approval-go">
                <input type="hidden" value="${personId }" id="personId"/>
                    <div class="approval-work">
                        <img src="<%=basePath%>front/public/images/approval-work.png" alt="">
                    </div>
                    加班
                </div>
            </div>
            <div title="待我审批" class="approval-tab">
                <div class="search-wrapper">
                    审批类型:
                    <select id="approvalTypeId1">
                        <option value="">全部</option>
                        <option value="1">加班</option>
                        <option value="2">请假</option>
                        <option value="3">设备报废</option>
                        <option value="4">车辆维修</option>
                        <option value="6">异常任务</option>
                    </select>
                   <!--  <input type="text" placeholder="请输入姓名" id="keyword1"> -->
                    <div class="search-btn search-btn1">搜索</div>
                </div>
                <div class="table-wait">
                    <table class="easyui-datagrid" id="approvalWait">
                        <tbody>
                          <!--   <tr>
                                <td>加班</td>
                                <td>张江龙</td>
                                <td>2017-12-54 12:54:10</td>
                                <td></td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div title="我已审批" class="approval-tab">
                <div class="search-wrapper">
                    审批类型:
                    <select id="approvalTypeId2">
                        <option value="">全部</option>
                        <option value="1">加班</option>
                        <option value="2">请假</option>
                        <option value="3">设备报废</option>
                        <option value="4">车辆维修</option>
                        <option value="6">异常任务</option>
                    </select>
                    <div class="search-btn search-btn2">搜索</div>
                </div>
                <div class="table-Over">
                    <table class="easyui-datagrid" id="approvalOver">
                        <!-- <tbody>
                            <tr>
                                <td>加班</td>
                                <td>张江龙</td>
                                <td>2017-12-54 12:54:10</td>
                                <td></td>
                            </tr>
                        </tbody> -->
                    </table>
                </div>
            </div>
            <div title="我发起的" class="approval-tab">
                <div class="search-wrapper">
                    审批类型:
                    <select id="approvalTypeId3">
                        <option value="">全部</option>
                        <option value="1">加班</option>
                        <option value="2">请假</option>
                        <option value="3">设备报废</option>
                        <option value="4">车辆维修</option>
                        <option value="6">异常任务</option>
                    </select>
                    <div class="search-btn search-btn3">搜索</div>
                </div>
                <div class="table-my">
                    <table class="easyui-datagrid" id="approvalMy">
                        <!-- <tbody>
                            <tr>
                                <td>加班</td>
                                <td>张江龙</td>
                                <td>2017-12-54 12:54:10</td>
                                <td></td>
                            </tr>
                        </tbody> -->
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="shade"></div>
    <!-- 请假弹窗 -->
    <div class="popup leave-popup">
        <div class="title">
            <span>请假</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form class="leave-form" method="post">
                <div class="content-item">
                    <label for="leave-type">*请假类型:</label>
                    <select class="easyui-validatebox" name="leaveType" data-options="required:true,validType:'selectValueRequired'">
                        <option value="0">请选择</option>
                        <option value="1">年假</option>
                        <option value="2">事假</option>
                        <option value="3">病假</option>
                        <option value="4">调休</option>
                        <option value="5">产假</option>
                        <option value="6">陪产假</option>
                        <option value="7">婚假</option>
                        <option value="8">例假</option>
                        <option value="9">丧假</option>
                    </select>
                </div>
                <div class="content-item">
                    <label for="leave-start">*开始时间:</label>
                    <input class="easyui-validatebox chose-time" name="time" type="text">
                </div>
                <div class="content-item">
                    <label for="leave-long">*时长(小时):</label>
                    <input class="easyui-validatebox hours" name="days" data-options="required:true" type="text">
                </div>
                <div class="content-item">
                    <label for="leave-reason">*请假事由:</label>
                    <textarea class="easyui-validatebox" name="description" data-options="required:true"></textarea>
                </div>
                <div class="content-item" id="levalApproval">
                    <!-- <label for="leave-person">审批人:</label>
                    <div class="leave-person">
                        <div>
                            <span>张江龙</span>
                            <p>admin</p>
                            <div>超级管理员</div>
                        </div>
                    </div>
                    <div class="leave-person">
                        <div>
                            <span>张江龙</span>
                            <p>admin</p>
                            <div>超级管理员</div>
                        </div>
                    </div>
                    <div class="leave-person">
                        <div>
                            <span>张江龙</span>
                            <p>admin</p>
                            <div>超级管理员</div>
                        </div>
                    </div> -->
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit leave-submit">提交</div>
        </div>
    </div>
    <!-- 加班弹窗 -->
    <div class="popup work-popup">
        <div class="title">
            <span>加班</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form class="work-form" method="post">
                <div class="content-item">
                    <label for="leave-type">*加班人:</label>
                    <!-- <select class="easyui-validatebox" data-options="required:true,validType:'selectValueRequired'">
                        <option value="0">请选择</option>
                        <option value="1">类型1</option>
                    </select> -->
                    <select class="easyui-comboTree cbt" id="personIds" name="personIds" data-options="required:true,validType:'selectValueRequired',prompt:'请选择'">
                    </select>
                </div>
                <div class="content-item">
                    <label for="work-start">*开始时间:</label>
                    <input class="easyui-validatebox chose-time" name="time" type="text">
                </div>
                <div class="content-item">
                    <label for="work-long">*时长(小时):</label>
                    <input class="easyui-validatebox hours" name="days" data-options="required:true" type="text">
                </div>
                <div class="content-item">
                    <label for="work-reason">加班事由:</label>
                    <textarea name="description"></textarea>
                </div>
                <div class="content-item">
                    <label for="work-days">*法定节日:</label>
                    <select name="isHostory" class="easyui-validatebox holiday">
                    	<option value="0" selected>请选择</option>
                        <option value="1">否</option>
                        <option value="2">是</option>
                    </select>
                </div>
                <div class="content-item" id="addApproval">
                    <!-- <label for="leave-person">审批人:</label>
                    <div class="leave-person">
                        <div>
                            <span>张江龙</span>
                            <p>admin</p>
                            <div>超级管理员</div>
                        </div>
                    </div>
                    <div class="leave-person">
                        <div>
                            <span>张江龙</span>
                            <p>admin</p>
                            <div>超级管理员</div>
                        </div>
                    </div>
                    <div class="leave-person">
                        <div>
                            <span>张江龙</span>
                            <p>admin</p>
                            <div>超级管理员</div>
                        </div>
                    </div> -->
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit work-submit">提交</div>
        </div>
    </div>
    <!-- 通过框 -->
    <div class="infor-wrapper pass-wrapper">
        <p>
            <i></i>
            是否确认通过?
        </p>
        <div>
            <a class="delete-confirm pass">确认</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div>
    <!-- 不通过框 -->
    <div class="infor-wrapper noPass-wrapper">
        <p>
            <i></i>
            是否确认通过?
        </p>
        <div>
            <a class="delete-confirm noPass">确认</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div>
    <!-- <div class="popup noPass-wrapper">
    	<div class="title">
            <span>审核</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
        <form class="wait-form" method="post">
        	<div class="content-item">
            <textarea name="remark" id="remark" rows="10" placeholder="请输入不通过原因"  class="easyui-validatebox"></textarea>
        	</div>
        </form>
        </div>
        <div class="footer">
            <a class="submit work-submit">提交</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div> -->
    <!-- 我已审批详情框 -->
    <div class="popup over-popup">
        <div class="title">
            <span>详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content" id="approvalDetail2">
            <form class="wait-form" method="post">
                <div class="content-item">
                    <label>姓名:</label>
                    <div>张江龙</div>
                </div>
                <div class="content-item">
                    <label>开始时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
                <div class="content-item">
                    <label>结束时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
                <div class="content-item">
                    <label>时长(小时):</label>
                    <div>111</div>
                </div>
                <div class="content-item">
                    <label>原因:</label>
                    <textarea disabled>整理文档</textarea>
                </div>
                <div class="content-item">
                    <label>提交时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
                <div class="content-item">
                    <label>状态:</label>
                    <div>
                        <a class="detail-pass">通过</a>
                        <a class="detail-passing">审批中</a>
                        <a class="detail-nopass">不通过</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- 我发起的审批详情 -->
    <div class="popup my-popup">
        <div class="title">
            <span>详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content" id="applyDetail">
            <!-- <form class="wait-form" method="post">
                <div class="content-item">
                    <label>姓名:</label>
                    <div>张江龙</div>
                </div>
                <div class="content-item">
                    <label>开始时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
                <div class="content-item">
                    <label>结束时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
                <div class="content-item">
                    <label>时长(小时):</label>
                    <div>111</div>
                </div>
                <div class="content-item">
                    <label>原因:</label>
                    <textarea disabled>整理文档</textarea>
                </div>
                <div class="content-item">
                    <label>提交时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
                <div class="content-item">
                    <label>状态:</label>
                    <div>
                        <a class="detail-pass">通过</a>
                        <a class="detail-passing">审批中</a>
                        <a class="detail-nopass">不通过</a>
                    </div>
                </div>
            </form> -->
        </div>
    </div>
    <!-- 待我审批(加班+调休)- -->
    <div class="popup wait-work-popup">
        <div class="title">
            <span>详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content" id="approvalDetail1">
            <!--<form class="wait-form" method="post">
                <div class="content-item">
                    <label>姓名:</label>
                    <div>张江龙</div>
                </div>
                <div class="content-item">
                    <label>开始时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
                <div class="content-item">
                    <label>结束时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
                <div class="content-item">
                    <label>时长(小时):</label>
                    <div>111</div>
                </div>
                <div class="content-item">
                    <label>原因:</label>
                    <textarea disabled>整理文档</textarea>
                </div>
                <div class="content-item">
                    <label>提交时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
            </form>-->
        </div>
	    <div class="footer">
	        <div class="submit work-pass" state='true'>通过</div>
	        <div class="submit work-nopass" state='true'>不通过</div>
	    </div>
    </div>
    <!-- 待我审批(车辆)- -->
    <div class="popup wait-car-popup">
        <div class="title">
            <span>详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form class="wait-form" method="post">
                <div class="content-item">
                    <label>姓名:</label>
                    <div>张江龙</div>
                </div>
                <div class="content-item">
                    <label>车辆类型:</label>
                    <div>通勤车</div>
                </div>
                <div class="content-item">
                    <label>车牌号:</label>
                    <div>川ADDDDDDD</div>
                </div>
                <div class="content-item">
                    <label>提交时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit car-pass">通过</div>
            <div class="submit car-nopass">不通过</div>
        </div>
    </div>
    <!-- 待我审批(设备)- -->
    <div class="popup wait-equip-popup">
        <div class="title">
            <span>详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form class="wait-form" method="post">
                <div class="content-item">
                    <label>姓名:</label>
                    <div>张江龙</div>
                </div>
                <div class="content-item">
                    <label>设备名称:</label>
                    <div>潜污泵</div>
                </div>
                <div class="content-item">
                    <label>规格型号:</label>
                    <div>sssssss</div>
                </div>
                <div class="content-item">
                    <label>提交时间:</label>
                    <div>2017-12-54 12:54:10</div>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit equip-pass">通过</div>
            <div class="submit equip-nopass">不通过</div>
        </div>
    </div>
    <!-- 待我审批(工单)- -->
    <div class="popup wait-job-popup">
        <div class="title">
            <span>详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form class="wait-form" method="post">
                <div class="content-item">
                    <label>姓名:</label>
                    <div>张江龙</div>
                </div>
                <div class="content-item">
                    <label>设备名称:</label>
                    <div>潜污泵</div>
                </div>
                <div class="content-item">
                    <label>所在厂站:</label>
                    <div>平窝乡污水处理厂</div>
                </div>
                <div class="content-item">
                    <label>工艺位置:</label>
                    <div>潜污泵</div>
                </div>
                <div class="content-item">
                    <label>异常描述:</label>
                    <textarea disabled>整理文档</textarea>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit job-pass">通过</div>
            <div class="submit job-nopass">不通过</div>
        </div>
    </div>
    <!-- 删除框 -->
    <div class="infor-wrapper delete-wrapper">
        <p>
            <i></i>
            是否确认删除?
        </p>
        <div>
            <a class="delete-confirm delete">删除</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div>
    <script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath%>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath%>front/public/js/laydate/laydate.js"></script>
    <script src="<%=basePath%>front/public/js/common.js"></script>
    <script src="<%=basePath%>front/public/js/customPrompt.js"></script>
    <!--<script src="../js/refresh.js"></script> -->
    <script src="<%=basePath%>front/public/js/personApproval.js"></script>
</body>

</html>