const jsx = (jsxObject) => {
    const stuff = Babel.transform(jsxObject, { presets: ["env", "react"] }).code;
    console.log(stuff);
    return eval(stuff);
};

const React = {
    createElement: (tag, props, ...children) => {
        console.log("createElement called with", tag, props, children)
        const element = document.createElement(tag);
        Object.keys(props || {}).forEach(prop => element[prop] = props[prop]);
        if (children) {
            for (const child of children) {
                if (["string", "number"].includes(typeof child)) {
                    element.innerHTML = child.toString();
                } else {
                    element.appendChild(child);
                }
            }
        }
        return element;
    }
};

const ReactDOM = {
    createRoot: (element) => {
        return {
            render: (x) => {
                console.log("render called with", x);
                if (x) {
                    element.appendChild(x);
                }
            }
        }
    }
};

const App = () => jsx(`
    <div className="hello-world">
        <h1>Big Title</h1>
        <img src="https://images.dog.ceo/breeds/cattledog-australian/IMG_0206.jpg" />
        <p>Hello world</p>
    </div>
`);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(App());
