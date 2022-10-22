package main

import (
	"io"
	"net/http"
	"text/template"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// TemplateRenderer is a custome html/template renderer for Echo framework
type TemplateRenderer struct {
	templates *template.Template
}

// Render renders a template document
func (t *TemplateRenderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {

	// Add global methods if data is a map
	if viewContext, isMap := data.(map[string]interface{}); isMap {
		viewContext["reverse"] = c.Echo().Reverse
	}
	return t.templates.ExecuteTemplate(w, name, data)
}

// サイトの共通情報
type ServiceInfo struct {
	Title string
}

var serviceInfo = ServiceInfo{
	Title: "Best Tune",
}

func main() {
	//echoインスタンスを立てる
	e := echo.New()

	e.Use(middleware.Logger())

	// template.ParseGlob("public/views/*.html")でパターンにマッチするファイルを検索してファイルを返す
	// template.Mustで、エラーだったらpanic、そうでなければtemplateファイルをそのまま返す
	renderer := &TemplateRenderer{
		templates: template.Must(template.ParseGlob("tmpl/*.html")),
	}

	// templatesをregister（登録）する
	e.Renderer = renderer
	e.GET("/hello", Hello)

	e.GET("/something", func(c echo.Context) error {
		return c.Render(http.StatusOK, "template.html", map[string]interface{}{
			"name": "Dolly!",
		})
	}).Name = "foobar"

	e.GET("/", func(c echo.Context) error {
		// テンプレートに渡す値

		data := struct {
			ServiceInfo
			Text_a string
			Text_b string
		}{
			ServiceInfo: serviceInfo,
			Text_a:      "aaaa",
			Text_b:      "bbbb",
		}

		return c.Render(http.StatusOK, "top", data)
	})
	e.GET("/your-tune", func(c echo.Context) error {
		// テンプレートに渡す値

		data := struct {
			ServiceInfo
		}{
			ServiceInfo: serviceInfo,
		}

		return c.Render(http.StatusOK, "your-tune", data)
	})
	e.Logger.Fatal(e.Start(":1323"))
}

// Render a template inside your handler (テンプレートのレンダリング処理)
func Hello(c echo.Context) error {
	return c.Render(http.StatusOK, "hello", "World")
}
