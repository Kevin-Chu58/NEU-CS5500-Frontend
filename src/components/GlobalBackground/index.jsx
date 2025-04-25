import React from 'react';
import { Box } from '@mui/material';

/**
 * 全局背景组件
 * 使用bg.png作为背景图片并添加蒙版使其灰度化
 */
const GlobalBackground = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {/* 背景图片层 */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/bg/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2,
        }}
      />
      
      {/* 蒙版层 - 降低背景图片的鲜艳度，但透明度更低 */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.65)', // 白色蒙版，降低不透明度从0.85到0.65
          backdropFilter: 'blur(1px) grayscale(15%)', // 减少模糊和灰度化效果
          zIndex: -1,
        }}
      />
      
      {/* 内容层 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default GlobalBackground; 