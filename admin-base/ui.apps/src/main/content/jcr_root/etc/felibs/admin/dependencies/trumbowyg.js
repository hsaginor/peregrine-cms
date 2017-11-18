/** Trumbowyg v2.8.1 - A lightweight WYSIWYG editor - alex-d.github.io/Trumbowyg - License MIT - Author : Alexandre Demode (Alex-D) / alex-d.fr */
jQuery.trumbowyg = {
    langs: {
      en: {
        viewHTML: "View HTML",
        undo: "Undo",
        redo: "Redo",
        formatting: "Formatting",
        p: "Paragraph",
        blockquote: "Quote",
        code: "Code",
        header: "Header",
        bold: "Bold",
        italic: "Italic",
        strikethrough: "Stroke",
        underline: "Underline",
        strong: "Strong",
        em: "Emphasis",
        del: "Deleted",
        superscript: "Superscript",
        subscript: "Subscript",
        unorderedList: "Unordered list",
        orderedList: "Ordered list",
        insertImage: "Insert Image",
        link: "Link",
        createLink: "Insert link",
        unlink: "Remove link",
        justifyLeft: "Align Left",
        justifyCenter: "Align Center",
        justifyRight: "Align Right",
        justifyFull: "Align Justify",
        horizontalRule: "Insert horizontal rule",
        removeformat: "Remove format",
        fullscreen: "Fullscreen",
        close: "Close",
        submit: "Confirm",
        reset: "Cancel",
        required: "Required",
        description: "Description",
        title: "Title",
        text: "Text",
        target: "Target"
      }
    },
    plugins: {},
    svgPath: null,
    hideButtonTexts: null
  }, Object.defineProperty(jQuery.trumbowyg, "defaultOptions", {
    value: {
      lang: "en",
      fixedBtnPane: !1,
      fixedFullWidth: !1,
      autogrow: !1,
      autogrowOnEnter: !1,
      prefix: "trumbowyg-",
      semantic: !0,
      resetCss: !1,
      removeformatPasted: !1,
      tagsToRemove: [],
      btns: [
        ["viewHTML"],
        ["undo", "redo"],
        ["formatting"],
        ["strong", "em", "del"],
        ["superscript", "subscript"],
        ["link"],
        ["insertImage"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
        ["unorderedList", "orderedList"],
        ["horizontalRule"],
        ["removeformat"],
        ["fullscreen"]
      ],
      btnsDef: {},
      inlineElementsSelector: "a,abbr,acronym,b,caption,cite,code,col,dfn,dir,dt,dd,em,font,hr,i,kbd,li,q,span,strikeout,strong,sub,sup,u",
      pasteHandlers: [],
      plugins: {}
    },
    writable: !1,
    enumerable: !0,
    configurable: !1
  }),
  function (e, t, n, a) {
    "use strict";
    var o = "tbwconfirm",
      r = "tbwcancel";
    a.fn.trumbowyg = function (e, t) {
      var n = "trumbowyg";
      if (e === Object(e) || !e) return this.each(function () {
        a(this).data(n) || a(this).data(n, new i(this, e))
      });
      if (1 === this.length) try {
        var o = a(this).data(n);
        switch (e) {
          case "execCmd":
            return o.execCmd(t.cmd, t.param, t.forceCss);
          case "openModal":
            return o.openModal(t.title, t.content);
          case "closeModal":
            return o.closeModal();
          case "openModalInsert":
            return o.openModalInsert(t.title, t.fields, t.callback);
          case "saveRange":
            return o.saveRange();
          case "getRange":
            return o.range;
          case "getRangeText":
            return o.getRangeText();
          case "restoreRange":
            return o.restoreRange();
          case "enable":
            return o.setDisabled(!1);
          case "disable":
            return o.setDisabled(!0);
          case "destroy":
            return o.destroy();
          case "empty":
            return o.empty();
          case "html":
            return o.html(t)
        }
      } catch (r) {}
      return !1
    };
    var i = function (o, r) {
      var i = this,
        s = "trumbowyg-icons",
        l = a.trumbowyg;
      i.doc = o.ownerDocument || n, i.$ta = a(o), i.$c = a(o), r = r || {}, null != r.lang || null != l.langs[r.lang] ? i.lang = a.extend(!0, {}, l.langs.en, l.langs[r.lang]) : i.lang = l.langs.en, i.hideButtonTexts = null != l.hideButtonTexts ? l.hideButtonTexts : r.hideButtonTexts;
      var d = null != l.svgPath ? l.svgPath : r.svgPath;
      if (i.hasSvg = d !== !1, i.svgPath = i.doc.querySelector("base") ? t.location.href.split("#")[0] : "", 0 === a("#" + s, i.doc).length && d !== !1) {
        if (null == d) try {
          throw new Error
        } catch (c) {
          if (c.hasOwnProperty("stack")) {
            var u = c.stack.split("\n");
            for (var g in u)
              if (u[g].match(/https?:\/\//)) {
                d = u[Number(g)].match(/((https?:\/\/.+\/)([^\/]+\.js))(\?.*)?:/)[1].split("/"), d.pop(), d = d.join("/") + "/ui/icons.svg";
                break
              }
          } else console.warn("You must define svgPath: https://goo.gl/CfTY9U")
        }
        var f = i.doc.createElement("div");
        f.id = s, i.doc.body.insertBefore(f, i.doc.body.childNodes[0]), a.ajax({
          async: !0,
          type: "GET",
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          dataType: "xml",
          crossDomain: !0,
          url: d,
          data: null,
          beforeSend: null,
          complete: null,
          success: function (e) {
            f.innerHTML = (new XMLSerializer).serializeToString(e.documentElement)
          }
        })
      }
      var h = i.lang.header,
        p = function () {
          return (t.chrome || t.Intl && Intl.v8BreakIterator) && "CSS" in t
        };
      i.btnsDef = {
        viewHTML: {
          fn: "toggle"
        },
        undo: {
          isSupported: p,
          key: "Z"
        },
        redo: {
          isSupported: p,
          key: "Y"
        },
        p: {
          fn: "formatBlock"
        },
        blockquote: {
          fn: "formatBlock"
        },
        h1: {
          fn: "formatBlock",
          title: h + " 1"
        },
        h2: {
          fn: "formatBlock",
          title: h + " 2"
        },
        h3: {
          fn: "formatBlock",
          title: h + " 3"
        },
        h4: {
          fn: "formatBlock",
          title: h + " 4"
        },
        subscript: {
          tag: "sub"
        },
        superscript: {
          tag: "sup"
        },
        bold: {
          key: "B",
          tag: "b"
        },
        italic: {
          key: "I",
          tag: "i"
        },
        underline: {
          tag: "u"
        },
        strikethrough: {
          tag: "strike"
        },
        strong: {
          fn: "bold",
          key: "B"
        },
        em: {
          fn: "italic",
          key: "I"
        },
        del: {
          fn: "strikethrough"
        },
        createLink: {
          key: "K",
          tag: "a"
        },
        unlink: {},
        insertImage: {},
        justifyLeft: {
          tag: "left",
          forceCss: !0
        },
        justifyCenter: {
          tag: "center",
          forceCss: !0
        },
        justifyRight: {
          tag: "right",
          forceCss: !0
        },
        justifyFull: {
          tag: "justify",
          forceCss: !0
        },
        unorderedList: {
          fn: "insertUnorderedList",
          tag: "ul"
        },
        orderedList: {
          fn: "insertOrderedList",
          tag: "ol"
        },
        horizontalRule: {
          fn: "insertHorizontalRule"
        },
        removeformat: {},
        fullscreen: {
          "class": "trumbowyg-not-disable"
        },
        close: {
          fn: "destroy",
          "class": "trumbowyg-not-disable"
        },
        formatting: {
          dropdown: ["p", "blockquote", "h1", "h2", "h3", "h4"],
          ico: "p"
        },
        link: {
          dropdown: ["createLink", "unlink"]
        }
      }, i.o = a.extend(!0, {}, l.defaultOptions, r), i.o.hasOwnProperty("imgDblClickHandler") || (i.o.imgDblClickHandler = i.getDefaultImgDblClickHandler()), i.disabled = i.o.disabled || "TEXTAREA" === o.nodeName && o.disabled, r.btns ? i.o.btns = r.btns : i.o.semantic || (i.o.btns[3] = ["bold", "italic", "underline", "strikethrough"]), a.each(i.o.btnsDef, function (e, t) {
        i.addBtnDef(e, t)
      }), i.eventNamespace = "trumbowyg-event", i.keys = [], i.tagToButton = {}, i.tagHandlers = [], i.pasteHandlers = [].concat(i.o.pasteHandlers), i.isIE = -1 !== e.userAgent.indexOf("MSIE") || -1 !== e.appVersion.indexOf("Trident/"), i.init()
    };
    i.prototype = {
      init: function () {
        var e = this;
        e.height = e.$ta.height(), e.initPlugins();
        try {
          e.doc.execCommand("enableObjectResizing", !1, !1), e.doc.execCommand("defaultParagraphSeparator", !1, "p")
        } catch (t) {}
        e.buildEditor(), e.buildBtnPane(), e.fixedBtnPaneEvents(), e.buildOverlay(), setTimeout(function () {
          e.disabled && e.setDisabled(!0), e.$c.trigger("tbwinit")
        })
      },
      addBtnDef: function (e, t) {
        this.btnsDef[e] = t
      },
      buildEditor: function () {
        var e = this,
          n = e.o.prefix,
          o = "";
        e.$box = a("<div/>", {
          "class": n + "box " + n + "editor-visible " + n + e.o.lang + " trumbowyg"
        }), e.isTextarea = e.$ta.is("textarea"), e.isTextarea ? (o = e.$ta.val(), e.$ed = a("<div/>"), e.$box.insertAfter(e.$ta).append(e.$ed, e.$ta)) : (e.$ed = e.$ta, o = e.$ed.html(), e.$ta = a("<textarea/>", {
          name: e.$ta.attr("id"),
          height: e.height
        }).val(o), e.$box.insertAfter(e.$ed).append(e.$ta, e.$ed), e.syncCode()), e.$ta.addClass(n + "textarea").attr("tabindex", -1), e.$ed.addClass(n + "editor").attr({
          contenteditable: !0,
          dir: e.lang._dir || "ltr"
        }).html(o), e.o.tabindex && e.$ed.attr("tabindex", e.o.tabindex), e.$c.is("[placeholder]") && e.$ed.attr("placeholder", e.$c.attr("placeholder")), e.$c.is("[spellcheck]") && e.$ed.attr("spellcheck", e.$c.attr("spellcheck")), e.o.resetCss && e.$ed.addClass(n + "reset-css"), e.o.autogrow || e.$ta.add(e.$ed).css({
          height: e.height
        }), e.semanticCode(), e.o.autogrowOnEnter && e.$ed.addClass(n + "autogrow-on-enter");
        var r, i = !1,
          s = !1,
          l = e.isIE ? "keyup" : "input";
        e.$ed.on("dblclick", "img", e.o.imgDblClickHandler).on("keydown", function (t) {
          if ((t.ctrlKey || t.metaKey) && !t.altKey) {
            i = !0;
            var n = e.keys[String.fromCharCode(t.which).toUpperCase()];
            try {
              return e.execCmd(n.fn, n.param), !1
            } catch (a) {}
          }
        }).on("compositionstart compositionupdate", function () {
          s = !0
        }).on(l + " compositionend", function (t) {
          if ("compositionend" === t.type) s = !1;
          else if (s) return;
          var n = t.which;
          n >= 37 && 40 >= n || (!t.ctrlKey && !t.metaKey || 89 !== n && 90 !== n ? i || 17 === n ? "undefined" == typeof t.which && e.semanticCode(!1, !1, !0) : (e.semanticCode(!1, "compositionend" === t.type && 13 === n), e.$c.trigger("tbwchange")) : e.$c.trigger("tbwchange"), setTimeout(function () {
            i = !1
          }, 200))
        }).on("mouseup keydown keyup", function () {
          clearTimeout(r), r = setTimeout(function () {
            e.updateButtonPaneStatus()
          }, 50)
        }).on("focus blur", function (t) {
          if (e.$c.trigger("tbw" + t.type), "blur" === t.type && a("." + n + "active-button", e.$btnPane).removeClass(n + "active-button " + n + "active"), e.o.autogrowOnEnter) {
            if (e.autogrowOnEnterDontClose) return;
            "focus" === t.type ? (e.autogrowOnEnterWasFocused = !0, e.autogrowEditorOnEnter()) : e.o.autogrow || (e.$ed.css({
              height: e.$ed.css("min-height")
            }), e.$c.trigger("tbwresize"))
          }
        }).on("cut", function () {
          setTimeout(function () {
            e.semanticCode(!1, !0), e.$c.trigger("tbwchange")
          }, 0)
        }).on("paste", function (n) {
          if (e.o.removeformatPasted) {
            n.preventDefault(), t.getSelection && t.getSelection().deleteFromDocument && t.getSelection().deleteFromDocument();
            try {
              var o = t.clipboardData.getData("Text");
              try {
                e.doc.selection.createRange().pasteHTML(o)
              } catch (r) {
                e.doc.getSelection().getRangeAt(0).insertNode(e.doc.createTextNode(o))
              }
              e.$c.trigger("tbwchange", n)
            } catch (i) {
              e.execCmd("insertText", (n.originalEvent || n).clipboardData.getData("text/plain"))
            }
          }
          a.each(e.pasteHandlers, function (e, t) {
            t(n)
          }), setTimeout(function () {
            e.semanticCode(!1, !0), e.$c.trigger("tbwpaste", n)
          }, 0)
        }), e.$ta.on("keyup", function () {
          e.$c.trigger("tbwchange")
        }).on("paste", function () {
          setTimeout(function () {
            e.$c.trigger("tbwchange")
          }, 0)
        }), e.$box.on("keydown", function (t) {
          return 27 === t.which && 1 === a("." + n + "modal-box", e.$box).length ? (e.closeModal(), !1) : void 0
        })
      },
      autogrowEditorOnEnter: function () {
        var e = this;
        e.$ed.removeClass("autogrow-on-enter");
        var t = e.$ed[0].clientHeight;
        e.$ed.height("auto");
        var n = e.$ed[0].scrollHeight;
        e.$ed.addClass("autogrow-on-enter"), t !== n && (e.$ed.height(t), setTimeout(function () {
          e.$ed.css({
            height: n
          }), e.$c.trigger("tbwresize")
        }, 0))
      },
      buildBtnPane: function () {
        var e = this,
          t = e.o.prefix,
          n = e.$btnPane = a("<div/>", {
            "class": t + "button-pane"
          });
        a.each(e.o.btns, function (o, r) {
          a.isArray(r) || (r = [r]);
          var i = a("<div/>", {
            "class": t + "button-group " + (r.indexOf("fullscreen") >= 0 ? t + "right" : "")
          });
          a.each(r, function (t, n) {
            try {
              e.isSupportedBtn(n) && i.append(e.buildBtn(n))
            } catch (a) {}
          }), n.append(i)
        }), e.$box.prepend(n)
      },
      buildBtn: function (e) {
        var t = this,
          n = t.o.prefix,
          o = t.btnsDef[e],
          r = o.dropdown,
          i = null != o.hasIcon ? o.hasIcon : !0,
          s = t.lang[e] || e,
          l = a("<button/>", {
            type: "button",
            "class": n + e + "-button " + (o["class"] || "") + (i ? "" : " " + n + "textual-button"),
            html: t.hasSvg && i ? '<svg><use xlink:href="' + t.svgPath + "#" + n + (o.ico || e).replace(/([A-Z]+)/g, "-$1").toLowerCase() + '"/></svg>' : t.hideButtonTexts ? "" : o.text || o.title || t.lang[e] || e,
            title: (o.title || o.text || s) + (o.key ? " (Ctrl + " + o.key + ")" : ""),
            tabindex: -1,
            mousedown: function () {
              return (!r || a("." + e + "-" + n + "dropdown", t.$box).is(":hidden")) && a("body", t.doc).trigger("mousedown"), !t.$btnPane.hasClass(n + "disable") || a(this).hasClass(n + "active") || a(this).hasClass(n + "not-disable") ? (t.execCmd((r ? "dropdown" : !1) || o.fn || e, o.param || e, o.forceCss), !1) : !1
            }
          });
        if (r) {
          l.addClass(n + "open-dropdown");
          var d = n + "dropdown",
            c = a("<div/>", {
              "class": d + "-" + e + " " + d + " " + n + "fixed-top",
              "data-dropdown": e
            });
          a.each(r, function (e, n) {
            t.btnsDef[n] && t.isSupportedBtn(n) && c.append(t.buildSubBtn(n))
          }), t.$box.append(c.hide())
        } else o.key && (t.keys[o.key] = {
          fn: o.fn || e,
          param: o.param || e
        });
        return r || (t.tagToButton[(o.tag || e).toLowerCase()] = e), l
      },
      buildSubBtn: function (e) {
        var t = this,
          n = t.o.prefix,
          o = t.btnsDef[e],
          r = null != o.hasIcon ? o.hasIcon : !0;
        return o.key && (t.keys[o.key] = {
          fn: o.fn || e,
          param: o.param || e
        }), t.tagToButton[(o.tag || e).toLowerCase()] = e, a("<button/>", {
          type: "button",
          "class": n + e + "-dropdown-button" + (o.ico ? " " + n + o.ico + "-button" : ""),
          html: t.hasSvg && r ? '<svg><use xlink:href="' + t.svgPath + "#" + n + (o.ico || e).replace(/([A-Z]+)/g, "-$1").toLowerCase() + '"/></svg>' + (o.text || o.title || t.lang[e] || e) : o.text || o.title || t.lang[e] || e,
          title: o.key ? " (Ctrl + " + o.key + ")" : null,
          style: o.style || null,
          mousedown: function () {
            return a("body", t.doc).trigger("mousedown"), t.execCmd(o.fn || e, o.param || e, o.forceCss), !1
          }
        })
      },
      isSupportedBtn: function (e) {
        try {
          return this.btnsDef[e].isSupported()
        } catch (t) {}
        return !0
      },
      buildOverlay: function () {
        var e = this;
        return e.$overlay = a("<div/>", {
          "class": e.o.prefix + "overlay"
        }).appendTo(e.$box), e.$overlay
      },
      showOverlay: function () {
        var e = this;
        a(t).trigger("scroll"), e.$overlay.fadeIn(200), e.$box.addClass(e.o.prefix + "box-blur")
      },
      hideOverlay: function () {
        var e = this;
        e.$overlay.fadeOut(50), e.$box.removeClass(e.o.prefix + "box-blur")
      },
      fixedBtnPaneEvents: function () {
        var e = this,
          n = e.o.fixedFullWidth,
          o = e.$box;
        e.o.fixedBtnPane && (e.isFixed = !1, a(t).on("scroll." + e.eventNamespace + " resize." + e.eventNamespace, function () {
          if (o) {
            e.syncCode();
            var r = a(t).scrollTop(),
              i = o.offset().top + 1,
              s = e.$btnPane,
              l = s.outerHeight() - 2;
            r - i > 0 && r - i - e.height < 0 ? (e.isFixed || (e.isFixed = !0, s.css({
              position: "fixed",
              top: 0,
              left: n ? "0" : "auto",
              zIndex: 7
            }), a([e.$ta, e.$ed]).css({
              marginTop: s.height()
            })), s.css({
              width: n ? "100%" : o.width() - 1 + "px"
            }), a("." + e.o.prefix + "fixed-top", o).css({
              position: n ? "fixed" : "absolute",
              top: n ? l : l + (r - i) + "px",
              zIndex: 15
            })) : e.isFixed && (e.isFixed = !1, s.removeAttr("style"), a([e.$ta, e.$ed]).css({
              marginTop: 0
            }), a("." + e.o.prefix + "fixed-top", o).css({
              position: "absolute",
              top: l
            }))
          }
        }))
      },
      setDisabled: function (e) {
        var t = this,
          n = t.o.prefix;
        t.disabled = e, e ? t.$ta.attr("disabled", !0) : t.$ta.removeAttr("disabled"), t.$box.toggleClass(n + "disabled", e), t.$ed.attr("contenteditable", !e)
      },
      destroy: function () {
        var e = this,
          n = e.o.prefix;
        e.isTextarea ? e.$box.after(e.$ta.css({
          height: ""
        }).val(e.html()).removeClass(n + "textarea").show()) : e.$box.after(e.$ed.css({
          height: ""
        }).removeClass(n + "editor").removeAttr("contenteditable").removeAttr("dir").html(e.html()).show()), e.$ed.off("dblclick", "img"), e.destroyPlugins(), e.$box.remove(), e.$c.removeData("trumbowyg"), a("body").removeClass(n + "body-fullscreen"), e.$c.trigger("tbwclose"), a(t).off("scroll." + e.eventNamespace + " resize." + e.eventNamespace)
      },
      empty: function () {
        this.$ta.val(""), this.syncCode(!0)
      },
      toggle: function () {
        var e = this,
          t = e.o.prefix;
        e.o.autogrowOnEnter && (e.autogrowOnEnterDontClose = !e.$box.hasClass(t + "editor-hidden")), e.semanticCode(!1, !0), setTimeout(function () {
          e.doc.activeElement.blur(), e.$box.toggleClass(t + "editor-hidden " + t + "editor-visible"), e.$btnPane.toggleClass(t + "disable"), a("." + t + "viewHTML-button", e.$btnPane).toggleClass(t + "active"), e.$box.hasClass(t + "editor-visible") ? e.$ta.attr("tabindex", -1) : e.$ta.removeAttr("tabindex"), e.o.autogrowOnEnter && !e.autogrowOnEnterDontClose && e.autogrowEditorOnEnter()
        }, 0)
      },
      dropdown: function (e) {
        var n = this,
          o = n.doc,
          r = n.o.prefix,
          i = a("[data-dropdown=" + e + "]", n.$box),
          s = a("." + r + e + "-button", n.$btnPane),
          l = i.is(":hidden");
        if (a("body", o).trigger("mousedown"), l) {
          var d = s.offset().left;
          s.addClass(r + "active"), i.css({
            position: "absolute",
            top: s.offset().top - n.$btnPane.offset().top + s.outerHeight(),
            left: n.o.fixedFullWidth && n.isFixed ? d + "px" : d - n.$btnPane.offset().left + "px"
          }).show(), a(t).trigger("scroll"), a("body", o).on("mousedown." + n.eventNamespace, function (e) {
            i.is(e.target) || (a("." + r + "dropdown", o).hide(), a("." + r + "active", o).removeClass(r + "active"), a("body", o).off("mousedown." + n.eventNamespace))
          })
        }
      },
      html: function (e) {
        var t = this;
        return null != e ? (t.$ta.val(e), t.syncCode(!0), t) : t.$ta.val()
      },
      syncTextarea: function () {
        var e = this;
        e.$ta.val(e.$ed.text().trim().length > 0 || e.$ed.find("hr,img,embed,iframe,input").length > 0 ? e.$ed.html() : "")
      },
      syncCode: function (e) {
        var t = this;
        if (!e && t.$ed.is(":visible")) t.syncTextarea();
        else {
          var n = a("<div>").html(t.$ta.val()),
            o = a("<div>").append(n);
          a(t.o.tagsToRemove.join(","), o).remove(), t.$ed.html(o.contents().html())
        }
        if (t.o.autogrow && (t.height = t.$ed.height(), t.height !== t.$ta.css("height") && (t.$ta.css({
            height: t.height
          }), t.$c.trigger("tbwresize"))), t.o.autogrowOnEnter) {
          t.$ed.height("auto");
          var r = t.autogrowOnEnterWasFocused ? t.$ed[0].scrollHeight : t.$ed.css("min-height");
          r !== t.$ta.css("height") && (t.$ed.css({
            height: r
          }), t.$c.trigger("tbwresize"))
        }
      },
      semanticCode: function (e, t, n) {
        var o = this;
        if (o.saveRange(), o.syncCode(e), o.o.semantic) {
          if (o.semanticTag("b", "strong"), o.semanticTag("i", "em"), o.semanticTag("strike", "del"), t) {
            var r = o.o.inlineElementsSelector,
              i = ":not(" + r + ")";
            o.$ed.contents().filter(function () {
              return 3 === this.nodeType && this.nodeValue.trim().length > 0
            }).wrap("<span data-tbw/>");
            var s = function (e) {
              if (0 !== e.length) {
                var t = e.nextUntil(i).addBack().wrapAll("<p/>").parent(),
                  n = t.nextAll(r).first();
                t.next("br").remove(), s(n)
              }
            };
            s(o.$ed.children(r).first()), o.semanticTag("div", "p", !0), o.$ed.find("p").filter(function () {
              return o.range && this === o.range.startContainer ? !1 : 0 === a(this).text().trim().length && 0 === a(this).children().not("br,span").length
            }).contents().unwrap(), a("[data-tbw]", o.$ed).contents().unwrap(), o.$ed.find("p:empty").remove()
          }
          n || o.restoreRange(), o.syncTextarea()
        }
      },
      semanticTag: function (e, t, n) {
        a(e, this.$ed).each(function () {
          var e = a(this);
          e.wrap("<" + t + "/>"), n && a.each(e.prop("attributes"), function () {
            e.parent().attr(this.name, this.value)
          }), e.contents().unwrap()
        })
      },
      createLink: function () {
        for (var e, t, n, o = this, r = o.doc.getSelection(), i = r.focusNode;
          ["A", "DIV"].indexOf(i.nodeName) < 0;) i = i.parentNode;
        if (i && "A" === i.nodeName) {
          var s = a(i);
          e = s.attr("href"), t = s.attr("title"), n = s.attr("target");
          var l = o.doc.createRange();
          l.selectNode(i), r.removeAllRanges(), r.addRange(l)
        }
        o.saveRange(), o.openModalInsert(o.lang.createLink, {
          url: {
            label: "URL",
            required: !0,
            value: e
          },
          title: {
            label: o.lang.title,
            value: t
          },
          text: {
            label: o.lang.text,
            value: o.getRangeText()
          },
          target: {
            label: o.lang.target,
            value: n
          }
        }, function (e) {
          var t = a(['<a href="', e.url, '">', e.text, "</a>"].join(""));
          return e.title.length > 0 && t.attr("title", e.title), e.target.length > 0 && t.attr("target", e.target), o.range.deleteContents(), o.range.insertNode(t[0]), !0
        })
      },
      unlink: function () {
        var e = this,
          t = e.doc.getSelection(),
          n = t.focusNode;
        if (t.isCollapsed) {
          for (;
            ["A", "DIV"].indexOf(n.nodeName) < 0;) n = n.parentNode;
          if (n && "A" === n.nodeName) {
            var a = e.doc.createRange();
            a.selectNode(n), t.removeAllRanges(), t.addRange(a)
          }
        }
        e.execCmd("unlink", void 0, void 0, !0)
      },
      insertImage: function () {
        var e = this;
        e.saveRange(), e.openModalInsert(e.lang.insertImage, {
          url: {
            label: "URL",
            required: !0
          },
          alt: {
            label: e.lang.description,
            value: e.getRangeText()
          }
        }, function (t) {
          return e.execCmd("insertImage", t.url), a('img[src="' + t.url + '"]:not([alt])', e.$box).attr("alt", t.alt), !0
        })
      },
      fullscreen: function () {
        var e, n = this,
          o = n.o.prefix,
          r = o + "fullscreen";
        n.$box.toggleClass(r), e = n.$box.hasClass(r), a("body").toggleClass(o + "body-fullscreen", e), a(t).trigger("scroll"), n.$c.trigger("tbw" + (e ? "open" : "close") + "fullscreen")
      },
      execCmd: function (e, t, n, a) {
        var o = this;
        a = !!a || "", "dropdown" !== e && o.$ed.focus();
        try {
          o.doc.execCommand("styleWithCSS", !1, n || !1)
        } catch (r) {}
        try {
          o[e + a](t)
        } catch (r) {
          try {
            e(t)
          } catch (i) {
            "insertHorizontalRule" === e ? t = void 0 : "formatBlock" === e && o.isIE && (t = "<" + t + ">"), o.doc.execCommand(e, !1, t), o.syncCode(), o.semanticCode(!1, !0)
          }
          "dropdown" !== e && (o.updateButtonPaneStatus(), o.$c.trigger("tbwchange"))
        }
      },
      openModal: function (e, n) {
        var i = this,
          s = i.o.prefix;
        if (a("." + s + "modal-box", i.$box).length > 0) return !1;
        i.o.autogrowOnEnter && (i.autogrowOnEnterDontClose = !0), i.saveRange(), i.showOverlay(), i.$btnPane.addClass(s + "disable");
        var l = a("<div/>", {
          "class": s + "modal " + s + "fixed-top"
        }).css({
          top: i.$btnPane.height()
        }).appendTo(i.$box);
        i.$overlay.one("click", function () {
          return l.trigger(r), !1
        });
        var d = a("<form/>", {
            action: "",
            html: n
          }).on("submit", function () {
            return l.trigger(o), !1
          }).on("reset", function () {
            return l.trigger(r), !1
          }).on("submit reset", function () {
            i.o.autogrowOnEnter && (i.autogrowOnEnterDontClose = !1)
          }),
          c = a("<div/>", {
            "class": s + "modal-box",
            html: d
          }).css({
            top: "-" + i.$btnPane.outerHeight() + "px",
            opacity: 0
          }).appendTo(l).animate({
            top: 0,
            opacity: 1
          }, 100);
        return a("<span/>", {
          text: e,
          "class": s + "modal-title"
        }).prependTo(c), l.height(c.outerHeight() + 10), a("input:first", c).focus(), i.buildModalBtn("submit", c), i.buildModalBtn("reset", c), a(t).trigger("scroll"), l
      },
      buildModalBtn: function (e, t) {
        var n = this,
          o = n.o.prefix;
        return a("<button/>", {
          "class": o + "modal-button " + o + "modal-" + e,
          type: e,
          text: n.lang[e] || e
        }).appendTo(a("form", t))
      },
      closeModal: function () {
        var e = this,
          t = e.o.prefix;
        e.$btnPane.removeClass(t + "disable"), e.$overlay.off();
        var n = a("." + t + "modal-box", e.$box);
        n.animate({
          top: "-" + n.height()
        }, 100, function () {
          n.parent().remove(), e.hideOverlay()
        }), e.restoreRange()
      },
      openModalInsert: function (e, t, n) {
        var i = this,
          s = i.o.prefix,
          l = i.lang,
          d = "";
        return a.each(t, function (e, t) {
          var n = t.label,
            a = t.name || e,
            o = t.attributes || {},
            r = Object.keys(o).map(function (e) {
              return e + '="' + o[e] + '"'
            }).join(" ");
          d += '<label><input type="' + (t.type || "text") + '" name="' + a + '" value="' + (t.value || "").replace(/"/g, "&quot;") + '"' + r + '><span class="' + s + 'input-infos"><span>' + (n ? l[n] ? l[n] : n : l[e] ? l[e] : e) + "</span></span></label>"
        }), i.openModal(e, d).on(o, function () {
          var e = a("form", a(this)),
            r = !0,
            s = {};
          a.each(t, function (t, n) {
            var o = a('input[name="' + t + '"]', e),
              l = o.attr("type");
            "checkbox" === l.toLowerCase() ? s[t] = o.is(":checked") : s[t] = a.trim(o.val()), n.required && "" === s[t] ? (r = !1, i.addErrorOnModalField(o, i.lang.required)) : n.pattern && !n.pattern.test(s[t]) && (r = !1, i.addErrorOnModalField(o, n.patternError))
          }), r && (i.restoreRange(), n(s, t) && (i.syncCode(), i.$c.trigger("tbwchange"), i.closeModal(), a(this).off(o)))
        }).one(r, function () {
          a(this).off(o), i.closeModal()
        })
      },
      addErrorOnModalField: function (e, t) {
        var n = this.o.prefix,
          o = e.parent();
        e.on("change keyup", function () {
          o.removeClass(n + "input-error")
        }), o.addClass(n + "input-error").find("input+span").append(a("<span/>", {
          "class": n + "msg-error",
          text: t
        }))
      },
      getDefaultImgDblClickHandler: function () {
        var e = this;
        return function () {
          var t = a(this),
            n = t.attr("src"),
            o = "(Base64)";
          return 0 === n.indexOf("data:image") && (n = o), e.openModalInsert(e.lang.insertImage, {
            url: {
              label: "URL",
              value: n,
              required: !0
            },
            alt: {
              label: e.lang.description,
              value: t.attr("alt")
            }
          }, function (e) {
            return e.src !== o && t.attr({
              src: e.src
            }), t.attr({
              alt: e.alt
            }), !0
          }), !1
        }
      },
      saveRange: function () {
        var e = this,
          t = e.doc.getSelection();
        if (e.range = null, t.rangeCount) {
          var n, a = e.range = t.getRangeAt(0),
            o = e.doc.createRange();
          o.selectNodeContents(e.$ed[0]), o.setEnd(a.startContainer, a.startOffset), n = (o + "").length, e.metaRange = {
            start: n,
            end: n + (a + "").length
          }
        }
      },
      restoreRange: function () {
        var e, t = this,
          n = t.metaRange,
          a = t.range,
          o = t.doc.getSelection();
        if (a) {
          if (n && n.start !== n.end) {
            var r, i = 0,
              s = [t.$ed[0]],
              l = !1,
              d = !1;
            for (e = t.doc.createRange(); !d && (r = s.pop());)
              if (3 === r.nodeType) {
                var c = i + r.length;
                !l && n.start >= i && n.start <= c && (e.setStart(r, n.start - i), l = !0), l && n.end >= i && n.end <= c && (e.setEnd(r, n.end - i), d = !0), i = c
              } else
                for (var u = r.childNodes, g = u.length; g > 0;) g -= 1, s.push(u[g])
          }
          o.removeAllRanges(), o.addRange(e || a)
        }
      },
      getRangeText: function () {
        return this.range + ""
      },
      updateButtonPaneStatus: function () {
        var e = this,
          t = e.o.prefix,
          n = e.getTagsRecursive(e.doc.getSelection().focusNode),
          o = t + "active-button " + t + "active";
        a("." + t + "active-button", e.$btnPane).removeClass(o), a.each(n, function (n, r) {
          var i = e.tagToButton[r.toLowerCase()],
            s = a("." + t + i + "-button", e.$btnPane);
          if (s.length > 0) s.addClass(o);
          else try {
            s = a("." + t + "dropdown ." + t + i + "-dropdown-button", e.$box);
            var l = s.parent().data("dropdown");
            a("." + t + l + "-button", e.$box).addClass(o)
          } catch (d) {}
        })
      },
      getTagsRecursive: function (e, t) {
        var n = this;
        if (t = t || (e && e.tagName ? [e.tagName] : []), !e || !e.parentNode) return t;
        e = e.parentNode;
        var o = e.tagName;
        return "DIV" === o ? t : ("P" === o && "" !== e.style.textAlign && t.push(e.style.textAlign), a.each(n.tagHandlers, function (a, o) {
          t = t.concat(o(e, n))
        }), t.push(o), n.getTagsRecursive(e, t).filter(function (e) {
          return null != e
        }))
      },
      initPlugins: function () {
        var e = this;
        e.loadedPlugins = [], a.each(a.trumbowyg.plugins, function (t, n) {
          (!n.shouldInit || n.shouldInit(e)) && (n.init(e), n.tagHandler && e.tagHandlers.push(n.tagHandler), e.loadedPlugins.push(n))
        })
      },
      destroyPlugins: function () {
        a.each(this.loadedPlugins, function (e, t) {
          t.destroy && t.destroy()
        })
      }
    }
  }(navigator, window, document, jQuery);