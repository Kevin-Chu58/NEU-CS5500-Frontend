import {
    Container,
    Typography,
    Grid2 as Grid,
    Skeleton,
    Stack,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    Snackbar,
    Box,
    Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import tripService from "../../services/trip.ts";
import "./TripDetails.css";

// JWT解析函数
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const TripDetails = () => {
    const { id } = useParams();
    const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
    const [accessToken, setAccessToken] = useState(null);
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    // 表单弹窗控制
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', description: '' });
    const [submitting, setSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // 获取访问令牌
    useEffect(() => {
        const getToken = async () => {
            try {
                if (isAuthenticated) {
                    const token = await getAccessTokenSilently({
                        authorizationParams: {
                            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                        }
                    });
                    console.log("TripDetails: 成功获取令牌");
                    setAccessToken(token);
                } else {
                    console.log("TripDetails: 用户未认证");
                }
            } catch (error) {
                console.error("获取令牌失败:", error);
            }
        };

        getToken();
    }, [getAccessTokenSilently, isAuthenticated]);

    // Debug logger
    useEffect(() => {
        console.log("当前路由参数 - id:", id);
        console.log("Dialog状态:", dialogOpen);
        console.log("认证状态:", isAuthenticated ? "已登录" : "未登录");
        console.log("访问令牌状态:", accessToken ? "已获取" : "未获取");
    }, [id, dialogOpen, accessToken, isAuthenticated]);

    // 重定向到登录（如果需要）
    const handleLogin = () => {
        loginWithRedirect({
            authorizationParams: {
                redirect_uri: window.location.origin + window.location.pathname,
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            },
            appState: { returnTo: window.location.pathname }
        });
    };

    // 获取Trip详情
    useEffect(() => {
        const fetchTripDetails = async () => {
            if (!id) {
                console.error("URL中没有提供ID");
                setError("没有提供行程ID");
                setLoading(false);
                return;
            }
            
            if (!isAuthenticated) {
                console.log("用户未登录，无法加载数据");
                setError("请登录后查看行程详情");
                setLoading(false);
                return;
            }
            
            if (!accessToken) {
                console.log("令牌尚未加载，等待");
                return; // 等待令牌加载
            }
            
            setLoading(true);
            try {
                console.log("开始获取Trip ID:", id);
                
                const data = await tripService.getTripDetail(id, accessToken);
                
                if (data) {
                    setTrip(data);
                    setError(null);
                    console.log("Trip数据已成功设置到状态中:", data);
                } else {
                    console.error("API返回了空数据");
                    setError("从服务器接收到空数据");
                }
            } catch (err) {
                console.error("获取行程详情失败:", err);
                setError(`获取行程详情失败: ${err.message || "未知错误"}`);
            } finally {
                setLoading(false);
            }
        };

        if (id && accessToken && isAuthenticated) {
            console.log("触发fetchTripDetails, ID:", id);
            fetchTripDetails();
        } else if (!accessToken && isAuthenticated) {
            console.log("等待访问令牌...");
        } else if (!isAuthenticated) {
            setLoading(false);
        } else {
            console.error("URL中没有ID参数");
            setError("URL中缺少行程ID");
            setLoading(false);
        }
    }, [id, accessToken, isAuthenticated]);

    const handleAdd = () => {
        console.log("handleAdd被调用");
        try {
            setFormData({ id: null, name: '', description: '' });
            console.log("表单数据已重置");
            
            setIsEditing(false);
            console.log("isEditing设置为false");
            
            setDialogOpen(true);
            console.log("dialogOpen设置为true");
            
            // 强制重新渲染
            setTimeout(() => {
                console.log("超时后，对话框状态:", dialogOpen);
                if (!dialogOpen) {
                    console.log("再次强制打开对话框");
                    setDialogOpen(true);
                }
            }, 100);
        } catch (error) {
            console.error("handleAdd中的错误:", error);
        }
    };

    const handleEdit = (subTrip) => {
        setFormData({ 
            id: subTrip.id, 
            name: subTrip.name, 
            description: subTrip.description || '' 
        });
        setIsEditing(true);
        setDialogOpen(true);
    };

    const handleSubmit = async () => {
        if (!trip || !accessToken || !isAuthenticated) {
            console.error("无法提交：", !trip ? "无行程数据" : !accessToken ? "无访问令牌" : "用户未登录");
            setSnackbar({
                open: true,
                message: '无法完成操作，请确保您已登录',
                severity: 'error'
            });
            return;
        }
        
        if (!formData.name) {
            setSnackbar({
                open: true,
                message: '名称不能为空',
                severity: 'error'
            });
            return;
        }
        
        setSubmitting(true);
        try {
            console.log("开始handleSubmit, isEditing:", isEditing);
            
            // 根据API文档准备正确的数据格式
            const submitData = {
                name: formData.name,
                description: formData.description || '' // 确保描述不为undefined
            };
            console.log("要提交的表单数据:", submitData);
            
            if (isEditing) {
                console.log("更新ID为以下值的小型行程:", formData.id);
                // 使用正式API服务更新小行程
                const updatedSmallTrip = await tripService.updateSmallTrip(formData.id, submitData, accessToken);
                console.log("更新响应:", updatedSmallTrip);

                setTrip((prev) => ({
                    ...prev,
                    smallTrips: prev.smallTrips.map((st) =>
                        st.id === formData.id ? updatedSmallTrip : st
                    ),
                }));
                
                setSnackbar({
                    open: true,
                    message: '子行程更新成功',
                    severity: 'success'
                });
            } else {
                // 创建新的SmallTrip，使用正式API服务
                console.log("为TripID创建新的小型行程:", trip.id);
                const newSmallTrip = await tripService.createSmallTrip(trip.id, submitData, accessToken);
                console.log("创建响应:", newSmallTrip);

                setTrip((prev) => ({
                    ...prev,
                    smallTrips: [...(prev.smallTrips || []), newSmallTrip],
                }));
                
                setSnackbar({
                    open: true,
                    message: '子行程创建成功',
                    severity: 'success'
                });
            }

            setDialogOpen(false);
        } catch (err) {
            console.error("操作失败:", err);
            console.error("错误详情:", err.message, err.stack);
            
            // 根据错误类型提供不同的错误消息
            let errorMessage = '操作失败';
            if (err.message.includes('401')) {
                errorMessage = '认证失败，请重新登录';
            } else if (err.message.includes('403')) {
                errorMessage = '您没有权限执行此操作';
            } else if (err.message.includes('404')) {
                errorMessage = '找不到要操作的资源';
            } else if (err.message.includes('400')) {
                errorMessage = '请求数据无效，请检查输入';
            } else if (err.message.includes('Network')) {
                errorMessage = '网络错误，请检查您的网络连接';
            } else {
                errorMessage = `操作失败: ${err.message || '请重试'}`;
            }
            
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: 'error'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (error) {
        return (
            <Container maxWidth="xl" className="trip-container">
                <Alert 
                    severity="error" 
                    action={
                        !isAuthenticated && (
                            <Button 
                                color="inherit" 
                                size="small" 
                                onClick={handleLogin}
                            >
                                登录
                            </Button>
                        )
                    }
                >
                    {error}
                </Alert>
            </Container>
        );
    }

    // 未登录状态下显示登录提示
    if (!isAuthenticated) {
        return (
            <Container maxWidth="xl" className="trip-container">
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    textAlign: 'center',
                    gap: 2
                }}>
                    <Typography variant="h5">请登录以查看行程详情</Typography>
                    <Typography variant="body1" color="text.secondary">
                        您需要登录才能访问此页面的内容
                    </Typography>
                    <Button 
                        variant="contained" 
                        size="large" 
                        onClick={handleLogin}
                        sx={{ mt: 2 }}
                    >
                        登录
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" className="trip-container">
            {/* 用户信息显示 */}
            <Box sx={{ 
                position: 'absolute', 
                top: 10, 
                right: 20, 
                display: 'flex', 
                alignItems: 'center',
                gap: 2,
                zIndex: 1000,
                background: 'rgba(255,255,255,0.8)',
                padding: '5px 15px',
                borderRadius: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <Typography variant="subtitle2" color="primary">
                    Trip ID: {id || 'Unknown'}
                </Typography>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                    {id ? id.substring(0, 1).toUpperCase() : '?'}
                </Avatar>
            </Box>
            
            <Stack direction="row" spacing={4} alignItems="flex-start">
                {/* Left: Main Trip Info */}
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            {loading ? (
                                <>
                                    <Skeleton variant="text" height={40} />
                                    <Skeleton variant="text" height={20} width="50%" />
                                </>
                            ) : trip ? (
                                <div className="main-info-card">
                                    <Typography className="trip-title">{trip.name}</Typography>
                                    <Typography sx={{ color: "gray" }}>
                                        Last updated: {new Date(trip.lastUpdatedAt).toLocaleString()}
                                    </Typography>
                                    <Typography className="trip-description">{trip.description}</Typography>
                                </div>
                            ) : (
                                <Alert severity="warning">No trip data available</Alert>
                            )}
                        </Grid>

                        <Grid size={12}>
                            <Typography className="subtrip-section-title">Sub-trips</Typography>
                            <Typography variant="caption" color="textSecondary">
                                Trip ID: {trip?.id}, Trip has data: {trip ? 'Yes' : 'No'}
                            </Typography>
                        </Grid>

                        <Grid size={12}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => {
                                    console.log("Add button clicked");
                                    console.log("Current dialog state:", dialogOpen);
                                    console.log("Trip data available:", !!trip);
                                    handleAdd();
                                    console.log("New dialog state should be:", true);
                                }} 
                                disabled={!trip}
                                sx={{ mb: 2 }}
                            >
                                Add New Sub-trip
                            </Button>
                        </Grid>

                        {loading ? (
                            [1, 2, 3].map((i) => (
                                <Grid key={i} size={12}>
                                    <Skeleton variant="rounded" height={60} />
                                </Grid>
                            ))
                        ) : trip?.smallTrips && trip.smallTrips.length > 0 ? (
                            trip.smallTrips.map((subTrip) => (
                                <Grid key={subTrip.id} size={12}>
                                    <div className="subtrip-card">
                                        <Typography className="subtrip-title">{subTrip.name}</Typography>
                                        <Typography className="subtrip-description">{subTrip.description}</Typography>
                                        <Button size="small" onClick={() => handleEdit(subTrip)}>
                                            Edit
                                        </Button>
                                    </div>
                                </Grid>
                            ))
                        ) : (
                            <Grid size={12}>
                                <Typography variant="body2" color="text.secondary">
                                    No sub-trips available.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Container>

                {/* Right: Meta Info Panel */}
                <div className="meta-panel">
                    <Typography variant="subtitle1">Meta Info</Typography>
                    {loading ? (
                        <Skeleton height={40} />
                    ) : trip ? (
                        <>
                            <Chip className="meta-chip" label={`Created by: ${trip.createdBy}`} />
                            <Typography variant="body2">
                                Created: {new Date(trip.createdAt).toLocaleString()}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body2">No metadata available</Typography>
                    )}
                </div>
            </Stack>

            {/* Sub-trip Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>{isEditing ? "Edit Sub-trip" : "Add New Sub-trip"}</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
                        Debug info: Dialog is {dialogOpen ? 'OPEN' : 'CLOSED'}
                    </Typography>
                    <TextField
                        label="Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        margin="dense"
                        required
                        autoFocus
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} disabled={submitting}>Cancel</Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        color="primary"
                        disabled={submitting || !formData.name}
                    >
                        {submitting ? "Processing..." : isEditing ? "Save" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 操作结果提示 */}
            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TripDetails;
