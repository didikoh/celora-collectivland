import { useEffect, useRef, useState } from "react"; // 从 React 中导入 useEffect 和 useRef 钩子
import {
  Scene,
  ArcRotateCamera,
  Engine,
  Vector3,
  DirectionalLight,
  Color3,
  KeyboardEventTypes,
  PointerEventTypes,
  // WebGPUEngine,
  Color4,
  ImportMeshAsync,
  AbstractMesh,
  ShadowGenerator,
  VertexBuffer,
  PBRMaterial,
  CubeTexture,
} from "@babylonjs/core"; // 导入 Babylon.js 核心库
import "@babylonjs/loaders"; // 导入 Babylon.js 的加载器模块
import "@babylonjs/inspector"; // 导入 Babylon.js 的 Inspector 模块
import styles from "./MyScene.module.css"; // 导入自定义的 CSS 文件
import { useAppContext } from "../context/AppContext";

const MyScene = ({ onLoaded, onProgress, unitLevel }: any) => {
  const { page, type, orientation, setSelectedUnit, level } = useAppContext();
  const canvasRef = useRef(null); // 使用 useRef 创建一个引用，用于绑定到 canvas 元素
  const { setDirection } = useAppContext();
  const [model, setModel] = useState(); // 使用 useState 创建一个状态，用于存储加载的模型
  const [currentScene, setCurrentScene] = useState<Scene | null>(null); // 创建一个状态，用于存储当前场景
  // const [currentCamera, setCurrentCamera] = useState<ArcRotateCamera | null>(
  //   null
  // ); // 创建一个状态，用于存储当前相机
  const shadowGeneratorRef = useRef<any>(null);
  const allLevels = useRef<AbstractMesh[]>([]);
  const topWallMesh = useRef<AbstractMesh[]>([]);
  const buttonMeshes = useRef<AbstractMesh[]>([]);
  const glassMeshes = useRef<AbstractMesh[]>([]);
  const colorMats = useRef<any[]>([]);

  const keyword = () => {
    switch (orientation) {
      case "North":
        return ["Type_C_button_02", "Type_C_button_03", "Type_D_button"];
      case "South":
        return ["Type_E_button_01", "Type_C_button_04", "Type_C_button_01"];
      case "East":
        return ["Type_A_button"];
      case "West":
        return ["Type_E_button"];
      default:
        return [""];
    }
  };

  const showUnit = () => {
    if (!buttonMeshes || !allLevels) return;
    if (buttonMeshes.current.length === 0 || allLevels.current.length === 0)
      return;

    if (buttonMeshes.current.length > 0) {
      buttonMeshes.current.forEach((mesh) => {
        if (
          keyword().some((key) => mesh.name.includes(key)) &&
          mesh.name.includes(type)
        ) {
          mesh.setEnabled(true);
        }
      });
    }

    if (allLevels.current.length > 0) {
      allLevels.current.forEach((e: any) => {
        const level = parseInt(e.name.substring(6, 8));
        if (level <= unitLevel) {
          e.setEnabled(true);
        } else {
          e.setEnabled(false);
        }
      });

      buttonMeshes.current.forEach((element) => {
        const levelBtn = parseInt(element.name.substring(6, 8));

        if (type === "" && orientation === "") {
          if (buttonMeshes.current.length > 0) {
            buttonMeshes.current.forEach((mesh) => {
              mesh.setEnabled(false);
            });
          }
          return;
        }

        if (
          keyword().some((key) => element.name.includes(key)) &&
          element.name.includes(type) &&
          levelBtn <= unitLevel
        ) {
          element.setEnabled(true);
        } else {
          element.setEnabled(false);
        }
      });
    }
  };

  useEffect(() => {
    showUnit();
  }, [type, orientation, unitLevel]);

  useEffect(() => {
    if (page === "Units") {
      if (topWallMesh.current.length > 0) {
        topWallMesh.current.forEach((element) => {
          element.setEnabled(false);
        });
      }
      showUnit();
    } else if (page === "Facilities") {
      if (level == "Level 8") {
        if (topWallMesh.current.length > 0) {
          topWallMesh.current.forEach((element) => {
            element.setEnabled(false);
          });
        }
        showUnit();
        if (allLevels.current.length > 0) {
          allLevels.current.forEach((e: any) => {
            e.setEnabled(false);
          });
        }
        if (buttonMeshes.current.length > 0) {
          buttonMeshes.current.forEach((element) => {
            element.setEnabled(false);
          });
        }
      }
      else if (level == "Rooftop") {
        if (topWallMesh.current.length > 0) {
          topWallMesh.current.forEach((element) => {
            element.setEnabled(true);
          });
        }
        showUnit();
        if (allLevels.current.length > 0) {
          allLevels.current.forEach((e: any) => {
            e.setEnabled(true);
          });
        }
        if (buttonMeshes.current.length > 0) {
          buttonMeshes.current.forEach((element) => {
            element.setEnabled(true);
          });
        }

      }
    } else {
      if (topWallMesh.current.length > 0) {
        if (!topWallMesh.current[0].isEnabled()) {
          topWallMesh.current.forEach((element) => {
            element.setEnabled(true);
          });
        }
      }
      if (allLevels.current.length > 0) {
        allLevels.current.forEach((e: any) => {
          e.setEnabled(true);
        });
      }
      if (buttonMeshes.current.length > 0) {
        buttonMeshes.current.forEach((element) => {
          element.setEnabled(false);
        });
      }
    }
  }, [page, level]);

  useEffect(() => {
    if (model && currentScene) {
      // const cameraOri = currentScene.getCameraByName("Camera");
      // const animCamera = currentScene.getAnimationGroupByName("Action.001");
      // const modelLandScape = currentScene.meshes.filter(
      //   (mesh) =>
      //     mesh.name.includes("lands") ||
      //     mesh.name.includes("lamp") ||
      //     mesh.name.includes("Line") ||
      //     mesh.name.includes("Map")
      // );
      const allLevelModels = currentScene.meshes.filter(
        (mesh) => mesh.name.includes("Level-") && !mesh.name.includes("button")
      );
      allLevels.current = allLevelModels;
      topWallMesh.current = currentScene.meshes.filter((mesh) =>
        mesh.name.includes("Top")
      );
      const buttonMesh = currentScene.meshes.filter((mesh) =>
        mesh.name.includes("button")
      );
      buttonMeshes.current = buttonMesh;
      const glassMesh = currentScene.meshes.filter((mesh) =>
        mesh.name.includes("layer")
      );
      glassMeshes.current = glassMesh;
      const greenColorMat = currentScene.getMaterialByName("Alpha_Box_03");
      const redColorMat = currentScene.getMaterialByName("Alpha_Box_02");
      const yellowColorMat = currentScene.getMaterialByName("Alpha_Box_01");
      const blueColorMat = currentScene.getMaterialByName("Alpha_Box");
      colorMats.current = [
        { key: "green", value: greenColorMat },
        { key: "red", value: redColorMat },
        { key: "yellow", value: yellowColorMat },
        { key: "blue", value: blueColorMat },
      ];
      buttonMesh.forEach((mesh) => {
        mesh.setEnabled(false);
      });


      // 为场景中的网格应用阴影
      currentScene.meshes.forEach((mesh) => {
        const hasNormals = mesh.isVerticesDataPresent(VertexBuffer.NormalKind);
        const isStdOrPBR =
          mesh.material &&
          ["StandardMaterial", "PBRMaterial"].includes(
            mesh.material.getClassName()
          );
        if (hasNormals && isStdOrPBR) {
          mesh.receiveShadows = true;
        }
      });

      const mesh = currentScene.meshes.filter(
        (mesh) =>
          (mesh.name.includes("Level") && !mesh.name.includes("button")) ||
          mesh.name.includes("Top") ||
          mesh.name.includes("Bottom")
      );

      mesh.forEach((mesh) => {
        shadowGeneratorRef.current.addShadowCaster(mesh);
        if (mesh.material) {
          if (mesh.material instanceof PBRMaterial) {
            mesh.material.metallic = 0.0;
          }
        }
      });

      glassMeshes.current.forEach((mesh) => {
        if (mesh.material) {
          if (mesh.material instanceof PBRMaterial) {
            // mesh.material.metallic = 0.7;
          }
        }
      });

      // 添加点击事件以记录被点击网格的名称
      currentScene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === PointerEventTypes.POINTERPICK) {
          const pickedMesh = pointerInfo.pickInfo?.pickedMesh;
          if (pickedMesh) {
            if (pickedMesh.name.includes("button")) {
              setSelectedUnit(pickedMesh.name);
            }
            // console.log("Clicked mesh name:", pickedMesh.name);
          }
        }
      });
    }
  }, [model, currentScene]); // 监视模型的变化

  useEffect(() => {
    const canvas = canvasRef.current; // 获取 canvas 元素的引用
    if (!canvas) {
      console.error("Canvas element not found!");
      return;
    }

    const timer = setTimeout(() => {
      const createEngine = async () => {
        // if (await WebGPUEngine.IsSupportedAsync) {
        //   // 使用 IsSupportedAsync 检查 WebGPU 支持
        //   const webgpuEngine = new WebGPUEngine(canvas); // 使用 WebGPUEngine
        //   await webgpuEngine.initAsync(); // 初始化 WebGPU 引擎
        //   // console.log("Using WebGPU for rendering.");
        //   return webgpuEngine;
        // } else {
        const webglEngine = new Engine(canvas, true, {
          antialias: true,
          alpha: true,
        }); // 使用 WebGL 引擎
        // console.log("WebGPU not supported. Falling back to WebGL.");
        return webglEngine;
        // }
      };

      createEngine().then((engine) => {
        const handleResize = () => engine.resize(); // 当窗口大小改变时，调整引擎的大小
        window.addEventListener("resize", handleResize); // 监听窗口大小变化事件

        const createScene = () => {
          const scene = new Scene(engine); // 创建一个新的 Babylon.js 场景

          if (!scene || !engine) {
            console.error("Scene or engine not initialized!");
            return;
          }

          // 添加太阳光
          const direction = new Vector3(0.6, -1.2, -0.35).normalize(); // 太阳光的方向
          const center = new Vector3(-0, 100, -0);
          const sunlight = new DirectionalLight("sunlight", direction, scene);
          sunlight.position = center.add(direction.scale(-300));
          sunlight.intensity = 3.5; // 设置太阳光的强度
          sunlight.diffuse = new Color3(1, 1, 1); // 设置漫反射颜色
          sunlight.specular = new Color3(1, 1, 1); // 设置高光颜色
          sunlight.shadowEnabled = true; // 启用阴影
          sunlight.autoCalcShadowZBounds = true;

          // // 为太阳光添加阴影生成器
          const shadowGenerator = new ShadowGenerator(4096, sunlight);
          shadowGenerator.useBlurCloseExponentialShadowMap = true; // 启用柔和阴影
          shadowGenerator.setDarkness(0.1); // 设置阴影的暗度
          shadowGeneratorRef.current = shadowGenerator;

          // 创建相机
          const camera = new ArcRotateCamera(
            "camera_b", // 相机名称
            0.0, // 水平旋转角度
            1.25, // 垂直旋转角度
            10000, // 相机半径
            new Vector3(0, 100, 0), // 相机目标位置
            scene // 所属场景
          );
          camera.attachControl(canvas, true); // 绑定相机到 canvas 上
          camera.lowerRadiusLimit = 0; // 最小半径限制 (Zoom)
          camera.upperRadiusLimit = 10000; // 最大半径限制 (Zoom)
          camera.wheelPrecision = 2; // 鼠标滚轮缩放灵敏度
          camera.lowerBetaLimit = 0.1; // 最低俯视角 (Rotate)
          camera.upperBetaLimit = Math.PI / 2; // 最高仰视角（最多水平）(Rotate)
          camera.panningSensibility = 100; // 平移灵敏度
          camera.panningInertia = 0.9; // 平移惯性
          camera.angularSensibilityY = 2500; // 垂直旋转灵敏度
          camera.angularSensibilityX = 2500; // 水平旋转灵敏度
          camera.minZ = 5; // 最小可视距离（靠得最近）
          camera.maxZ = 100000; // 最大可视距离（最远能看到多远）
          camera.radius = 200; // 相机半径
          camera.speed = 1; // 相机移动速度

          // // 限制相机目标范围
          // const minX = -600, maxX = 200, minY = 70, maxY = 600, minZ = -600, maxZ = 400;
          // camera.onViewMatrixChangedObservable.add(() => {
          //   camera.target.x = Math.min(Math.max(camera.target.x, minX), maxX);
          //   camera.target.y = Math.min(Math.max(camera.target.y, minY), maxY);
          //   camera.target.z = Math.min(Math.max(camera.target.z, minZ), maxZ);
          //   camera.panningSensibility = Math.min(300, Math.max(25, 5000 / camera.radius));
          // });

          // setCurrentCamera(camera); // 更新状态以存储当前相机
          scene.activeCamera = camera; // 设置当前活动相机

          // 添加监听器以记录相机位置和目标
          camera.onViewMatrixChangedObservable.add(() => {
            setDirection(camera.alpha);
            // console.log("相机位置:", camera.position);
            // console.log("相机目标:", camera.target);
            // console.log("水平旋转角度 (alpha):", camera.alpha);
            // console.log("垂直旋转角度 (beta):", camera.beta);
            // console.log("相机半径 (radius):", camera.radius);
          });

          scene.clearColor = new Color4(0, 0, 0, 0);
          // engine.clear(scene.clearColor, true, true); // 清除蓝底

          // 调整 PBR 渲染参数
          scene.imageProcessingConfiguration.exposure = 1;
          scene.imageProcessingConfiguration.contrast = 1.3;
          scene.imageProcessingConfiguration.toneMappingEnabled = true;

          // 自定义环境纹理
          const hdrTexture = new CubeTexture(
            "./textures/environment.env",
            scene
          );

          // hdrTexture.rotationY = Math.PI / 2;

          // 设置环境纹理
          scene.environmentTexture = hdrTexture;
          scene.environmentIntensity = 1.3; // 调整环境强度以增强日出效果

          scene.createDefaultSkybox(hdrTexture, true, 5000); // 创建天空盒
          // if (skybox) skybox.infiniteDistance = true; // 默认就是 true

          // // 天空光（补光），direction 指向上（默认Y轴），可以稍微斜一点更自然
          // const hemi = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
          // hemi.intensity = 0.3; // 0.3~0.7 挺自然
          // hemi.groundColor = new Color3(0.2, 0.2, 0.25); // 地面反弹光（偏蓝灰）
          // hemi.diffuse = new Color3(1, 1, 1); // 天空光色（偏白/淡蓝）

          // const ssaoRatio = {
          //   ssaoRatio: 0.5, // SSAO 计算分辨率比例（性能相关）
          //   blurRatio: 0.5, // 模糊分辨率比例
          // };

          // const ssao2Pipeline = new SSAO2RenderingPipeline(
          //   "ssao2",
          //   scene,
          //   ssaoRatio
          // );

          // ssao2Pipeline.radius = 1; // 采样半径
          // ssao2Pipeline.totalStrength = 0.4; // AO 总强度
          // ssao2Pipeline.base = 0.5; // AO 基底强度
          // ssao2Pipeline.maxZ = 100; // AO 最大作用距离
          // ssao2Pipeline.expensiveBlur = true; // 更好模糊，但性能略降
          // ssao2Pipeline.samples = 8; // 采样数可适当减少，避免过度采样

          //  // 加到渲染管线
          // scene.postProcessRenderPipelineManager.addPipeline(ssao2Pipeline);
          // scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
          //   "ssao2",
          //   camera
          // );

          // const pipeline = new DefaultRenderingPipeline(
          //   "defaultPipeline",
          //   true,
          //   scene,
          //   [camera]
          // );

          // pipeline.fxaaEnabled = true; // 打开 FXAA 抗锯齿

          // 加载模型
          ImportMeshAsync("./models/Collectiv Land_Masterfile_06.glb", scene, {
            onProgress: function (evt) {
              if (evt.lengthComputable) {
                onProgress(((evt.loaded * 100) / evt.total).toFixed());
              } else {
                onProgress(((evt.loaded * 100) / 490861912).toFixed());
              }
            },
          })
            .then((result: any) => {
              setModel(result); // 更新状态以存储加载的模型
              result.animationGroups.forEach((animationGroup: any) =>
                animationGroup.start(true)
              ); // 循环播放动画
              if (onLoaded) onLoaded(); // 调用加载完成的回调
            })
            .catch((error) => console.error("Failed to load model:", error)); // 捕获加载模型的错误

          return scene; // 返回创建的场景
        };

        const scene = createScene(); // 调用 createScene 函数创建场景
        if (!scene) {
          console.error("Failed to create scene!");
          return;
        }

        setCurrentScene(scene); // 更新状态以存储当前场景

        // Inspector 快捷键绑定
        scene.onKeyboardObservable.add(({ event, type }) => {
          if (
            type === KeyboardEventTypes.KEYDOWN &&
            event.ctrlKey &&
            event.key.toLowerCase() === "i"
          ) {
            scene.debugLayer.isVisible()
              ? scene.debugLayer.hide()
              : scene.debugLayer.show({
                embedMode: true,
                handleResize: true,
                overlay: true,
              });
          }
        });

        engine.runRenderLoop(() => scene.render()); // 在每一帧渲染场景

        return () => {
          window.removeEventListener("resize", handleResize); // 移除窗口大小变化事件监听器
          scene.dispose(); // 释放场景资源
          engine.dispose(); // 释放引擎资源
        };
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return <canvas className={styles.myCanvas} ref={canvasRef}></canvas>; // 返回一个绑定了引用的 canvas 元素
};

export default MyScene; // 导出 Scene 组件
