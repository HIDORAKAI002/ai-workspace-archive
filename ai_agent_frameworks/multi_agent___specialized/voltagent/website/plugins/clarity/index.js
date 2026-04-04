async function microsoftClarity() {
  return {
    name: "docusaurus-plugin-clarity",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: "https://www.clarity.ms",
            },
          },
          {
            tagName: "script",
            innerHTML: `
                      (function(c,l,a,r,i,t,y){
                          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                       })(window, document, "clarity", "script", "r55e8c4843");`,
          },
        ],
      };
    },
  };
}
exports.default = microsoftClarity;
