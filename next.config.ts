import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
    output: 'export',
    basePath: '/meo-farm',
    trailingSlash: true,
    assetPrefix: "./",
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work
        return config;
    },
};

export default nextConfig;
