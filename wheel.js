!(function () {
    var a = (function () {
            function a(c) {
                (b = this),
                    (this.TiltChangeCountdown = 5),
                    (this.angle = 0),
                    (this.tiltAngle = 0),
                    (this.canvasSelector = c.canvas),
                    (this.canvas = document.getElementById(b.canvasSelector)),
                    (this.ctx = b.canvas.getContext("2d")),
                    (this.W = window.innerWidth),
                    (this.H = window.innerHeight),
                    (this.canvas.width = b.W),
                    (this.canvas.height = b.H),
                    (this.particles = []),
                    (this.mp = c.intensity),
                    (this.speed = c.speed),
                    (this.color = { r: c.color.r, g: c.color.g, b: c.color.b }),
                    (this.confettiHandler = null);
                for (var d = !1, e = 0; e < b.mp; e++)
                    (null === b.color.r || d) && ((b.color = { r: Math.floor(255 * Math.random()), g: Math.floor(255 * Math.random()), b: Math.floor(255 * Math.random()) }), (d = !0)),
                        b.particles.push({
                            x: Math.random() * b.W,
                            y: Math.random() * b.H,
                            r: a.randomFromTo(5, 30),
                            d: Math.random() * b.mp + 10,
                            color: "rgba(" + b.color.r + ", " + b.color.g + ", " + b.color.b + ", 0.7)",
                            tilt: Math.floor(10 * Math.random()) - 10,
                            tiltAngleIncremental: 0.07 * Math.random() + 0.05,
                            tiltAngle: 0,
                        });
                a.initConfetti();
            }
            var b;
            return (
                (a.draw = function () {
                    b.ctx.clearRect(0, 0, b.W, b.H);
                    for (var c = 0; c < b.mp; c++) {
                        var d = b.particles[c];
                        b.ctx.beginPath(), (b.ctx.lineWidth = d.r / 2), (b.ctx.strokeStyle = d.color), b.ctx.moveTo(d.x + d.tilt + d.r / 4, d.y), b.ctx.lineTo(d.x + d.tilt, d.y + d.tilt + d.r / 4), b.ctx.stroke();
                    }
                    a.update();
                }),
                (a.randomFromTo = function (a, b) {
                    return Math.floor(Math.random() * (b - a + 1) + a);
                }),
                (a.update = function () {
                    (b.angle += 0.01), (b.tiltAngle += 0.1), b.TiltChangeCountdown--;
                    for (var a = 0; a < b.mp; a++) {
                        var c = b.particles[a];
                        (c.tiltAngle += c.tiltAngleIncremental),
                            (c.y += (Math.cos(b.angle + c.d) + 1 + c.r / b.speed) / 2),
                            (c.x += Math.sin(b.angle)),
                            (c.tilt = 15 * Math.sin(c.tiltAngle - a / 3)),
                            (c.x > b.W + 5 || c.x < -5 || c.y > b.H) &&
                                (b.particles[a] =
                                    a % 5 > 0 || a % 2 === 0
                                        ? { x: Math.random() * b.W, y: -10, r: c.r, d: c.d, color: c.color, tilt: Math.floor(10 * Math.random()) - 10, tiltAngle: c.tiltAngle, tiltAngleIncremental: c.tiltAngleIncremental }
                                        : Math.sin(b.angle) > 0
                                        ? { x: -5, y: Math.random() * b.H, r: c.r, d: c.d, color: c.color, tilt: Math.floor(10 * Math.random()) - 10, tiltAngleIncremental: c.tiltAngleIncremental }
                                        : { x: b.W + 5, y: Math.random() * b.H, r: c.r, d: c.d, color: c.color, tilt: Math.floor(10 * Math.random()) - 10, tiltAngleIncremental: c.tiltAngleIncremental });
                    }
                }),
                (a.StartConfetti = function () {
                    (b.W = window.innerWidth), (b.H = window.innerHeight), (b.canvas.width = b.W), (b.canvas.height = b.H), (b.confettiHandler = setInterval(a.draw, 15));
                }),
                (a.initConfetti = function () {
                    $(window).resize(function () {
                        (canvas = document.getElementById(b.canvasSelector)), (b.W = window.innerWidth), (b.H = window.innerHeight), (canvas.width = b.W), (canvas.height = b.H);
                    }),
                        a.StartConfetti();
                }),
                (a.prototype = {
                    StopConfetti: function () {
                        clearTimeout(b.confettiHandler), void 0 != b.ctx && b.ctx.clearRect(0, 0, b.W, b.H);
                    },
                }),
                a
            );
        })(),
        b = (function () {
            function a() {
                (b = this), (b.QueryString = a.checkForQueryString());
            }
            var b;
            return (
                (a.checkForQueryString = function () {
                    var a,
                        b = [],
                        c = !1,
                        d = window.location.search.split("=")[1];
                    if ("undefined" != typeof d) {
                        d = decodeURI(d);
                        for (var f = d.split(","), g = 0; g < f.length; g++) b.push({ text: f[g], color: e.getColor() });
                        (c = !0), (a = e.shuffleArray(b));
                    }
                    return { hasQuery: c, query_string: a };
                }),
                a
            );
        })(),
        c = (function () {
            function b() {
                (c = this), this.canvas, this.context, (this.arc = null), (this.init = !0), (this.spinning = !1), (this.startAngle = 0), this.ThingListHelper;
            }
            var c,
                d,
                f,
                g,
                h,
                i = null,
                j = window.innerWidth,
                k = (window.innerHeight, j > 767),
                l = k ? 4 : 2,
                m = window.innerWidth / l,
                n = k ? j - 260 : 2 * j - 80,
                o = k ? Math.round(n / 2) + "px" : Math.round(n / 2) + "px";
            return (
                (b.initCanvas = function () {
                    (c.canvas = document.getElementById("wheel")), (c.canvas.width = n), (c.canvas.height = n), (c.canvas.style.width = o), (c.canvas.style.height = o), (c.context = c.canvas.getContext("2d")), c.context.scale(2, 2);
                }),
                (b.spin = function () {
                    return c.ThingListHelper.things.length < 2
                        ? void e.errorHandling(e.errors.noValues)
                        : ((d = 10 + e.getRandom(17, 20)),
                          (f = 0),
                          (g = 5 + 5 * Math.random()),
                          (h = 1e3 * g.toFixed(3)),
                          document.getElementById("spin").classList.add("is-spinning"),
                          document.getElementById("spin-mobile").classList.add("is-spinning"),
                          void (!Modernizr.touch && e.armShowing
                              ? $(".wheel-wrapper")
                                    .addClass("goFull")
                                    .on(e.transEndEventName, function () {
                                        $(this).off(e.transEndEventName),
                                            document.getElementById("arm").classList.add("spinwheel"),
                                            setTimeout(function () {
                                                b.rotateWheel();
                                            }, 3090);
                                    })
                              : $(".wheel-wrapper")
                                    .addClass("show")
                                    .on(e.transEndEventName, function () {
                                        b.rotateWheel();
                                    })));
                }),
                (b.rotateWheel = function () {
                    if (((c.spinning = !0), (f += 10), f >= h)) return void b.stopRotateWheel();
                    var a = d - b.easeOut(f, 0, d, h);
                    (c.startAngle += (a * Math.PI) / 180), c.drawSpinnerWheel(!1), (i = setTimeout(b.rotateWheel, 10));
                }),
                (b.stopRotateWheel = function () {
                    var b = $(".winner");
                    clearTimeout(i);
                    var d = (180 * c.startAngle) / Math.PI + 90,
                        f = (180 * c.arc) / Math.PI,
                        g = Math.floor((360 - (d % 360)) / f);
                    c.context.save(),
                        b.text(c.ThingListHelper.things[g].text.toLowerCase()),
                        c.context.restore(),
                        (e.confettiWinnerHelper = new a({ canvas: "confetti-winner", intensity: 150, speed: 2, color: { r: null, g: null, b: null } })),
                        (e.sections.winner.style.backgroundColor = c.ThingListHelper.things[g].color),
                        e.changeView(e.sections.wheel, e.sections.winner, function () {
                            b.addClass("show"), e.cheer.play();
                        });
                }),
                (b.easeOut = function (a, b, c, d) {
                    var e = (a /= d) * a,
                        f = e * a;
                    return b + c * (f + -3 * e + 3 * a);
                }),
                (b.prototype = {
                    drawSpinnerWheel: function (a) {
                        c.arc = Math.PI / (c.ThingListHelper.things.length / 2);
                        var b = n / 4;
                        if (c.canvas.getContext) {
                            var d = b - 30;
                            c.context.clearRect(0, 0, 1e3, 1e3), (c.context.font = "14px Helvetica, Arial");
                            for (var f = a ? e.shuffleArray(c.ThingListHelper.things) : c.ThingListHelper.things, g = 0; g < f.length; g++) {
                                var h = c.startAngle + g * c.arc;
                                (c.context.fillStyle = f[g].color), c.context.beginPath(), c.context.arc(b, b, d, h, h + c.arc, !1), c.context.arc(b, b, 0, h + c.arc, h, !0), c.context.fill(), c.context.save();
                            }
                            (c.context.fillStyle = "#fff"),
                                c.context.beginPath(),
                                c.context.moveTo(b - 30, b - (d + 15)),
                                c.context.lineTo(b + 30, b - (d + 15)),
                                c.context.lineTo(b + 0, b - (d - 30)),
                                c.context.lineTo(b - 30, b - (d + 15)),
                                c.context.fill();
                        }
                    },
                    bindEvents: function () {
                        $(".spin").on("click", b.spin), k && $("#spin .big-btn").css({ borderLeftWidth: m + "px", borderRightWidth: m + "px" }), b.initCanvas(), (c.ThingListHelper = e.thingListHelper);
                    },
                }),
                b
            );
        })(),
        d = (function () {
            function a(c) {
                if (((b = this), this.activeColor, (this.inputField = $("#thing-box")), (this.list = $("#thing-list")), (this.spinBtn = $(".spin")), (this.$shareUrl = $("#thing-list .generatedUrl")), this.WheelHelper, c.length > 0)) {
                    b.spinBtn.addClass("ready-to-spin"), (this.things = c);
                    for (var d = 0; d < c.length; d++)
                        a.addToList(c[d], !0, function (a) {
                            b.WheelHelper.drawSpinnerWheel(!1),
                                setTimeout(function () {
                                    a.removeClass("noAnim");
                                }, 100);
                        });
                } else this.things = new Array();
            }
            var b;
            return (
                (a.addthing = function (c) {
                    c.preventDefault();
                    var d = b.inputField.val();
                    if (!b.WheelHelper.spinning) {
                        if ("" === d) return void e.errorHandling(e.errors.emptyInput);
                        if (a.checkIfDuplicated(d)) return void e.errorHandling(e.errors.valueExist);
                        var f = { text: d, color: b.activeColor };
                        a.addToList(f, !1, function () {
                            b.inputField.val(""), a.updateShareUrl(), b.WheelHelper.drawSpinnerWheel(!0);
                        }),
                            (b.activeColor = e.getColor()),
                            a.changeColorOfButton();
                    }
                }),
                (a.addToList = function (c, d, e) {
                    d || b.things.push(c);
                    var f = $(a.getThingTemplate(c));
                    b.list.prepend(f),
                        setTimeout(function () {
                            f.addClass(d ? "show noAnim" : "show"), e(f);
                        }, 10);
                }),
                (a.removething = function (c) {
                    if (!b.WheelHelper.spinning) {
                        var d = $(c.currentTarget).siblings("span").text(),
                            f = $(c.currentTarget).parent();
                        a.checkIfContainsInThings(d, function (c, d) {
                            d &&
                                f.removeClass("show").on(e.transEndEventName, function (d) {
                                    "height" === d.originalEvent.propertyName && (this.remove(), b.things.splice(c, 1), b.WheelHelper.drawSpinnerWheel(!1), a.updateShareUrl());
                                });
                        });
                    }
                }),
                (a.checkIfDuplicated = function (b) {
                    var c;
                    return (
                        a.checkIfContainsInThings(b, function (a, b) {
                            c = b;
                        }),
                        c
                    );
                }),
                (a.checkIfContainsInThings = function (a, c) {
                    for (var d = 0; d < b.things.length; d++) if (b.things[d].text === a) return void c(d, !0);
                    c(null, !1);
                }),
                (a.getThingTemplate = function (a) {
                    var b = $("#thing-template").html(),
                        c = Handlebars.compile(b);
                    return c(a);
                }),
                (a.changeColorOfButton = function () {
                    $("#add-thing-btn").css({ backgroundColor: b.activeColor });
                }),
                (a.updateShareUrl = function () {
                    if (b.things.length > 1) {
                        b.spinBtn.addClass("ready-to-spin");
                        var a = "http://fluky.io?things=",
                            c = "";
                        b.things.forEach(function (a, b) {
                            var d = b > 0 ? "," + a.text : a.text;
                            c += d;
                        }),
                            b.$shareUrl.addClass("visible"),
                            b.$shareUrl.find("#url-to-share").val((a += c));
                    } else b.$shareUrl.removeClass("visible"), b.spinBtn.removeClass("ready-to-spin");
                }),
                (a.prototype = {
                    bindEvents: function () {
                        $("#add-thing").on("submit", a.addthing), $("#thing-list").on("click", ".remove", a.removething), (b.activeColor = e.getColor()), a.changeColorOfButton(), (b.WheelHelper = e.spinningWheelHelper);
                    },
                }),
                a
            );
        })();
    window.requestAnimFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (a) {
                window.setTimeout(a, 1e3 / 60);
            }
        );
    })();
    var e = {
            sections: { intro: null, wheel: null, winner: null },
            transEndEventNames: { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", msTransition: "MSTransitionEnd", transition: "transitionend" },
            errors: { noValues: "Add something", valueExist: "This value already exists", emptyInput: "Type something" },
            transEndEventName: null,
            armShowing: !1,
            theme: document.getElementById("theme"),
            cheer: document.getElementById("cheer"),
            IntroConfettiObject: { canvas: "confetti-intro", speed: 10, intensity: 15, color: { r: 110, g: 210, b: 160 } },
            init: function (c) {
                (e.spinningWheelHelper = null),
                    (e.thingListHelper = null),
                    (e.confettiIntroHelper = null),
                    (e.confettiWinnerHelper = null),
                    (e.queryStringHelper = null),
                    (e.sections.intro = document.getElementById("intro")),
                    (e.sections.wheel = document.getElementById("spinning-wheel")),
                    (e.sections.winner = document.getElementById("winner")),
                    (e.transEndEventName = e.transEndEventNames[Modernizr.prefixed("transition")]),
                    c
                        ? (history.pushState && window.location.href.indexOf("?") > -1 && e.clearUrl(), Modernizr.touch || (e.cheer.pause(), (e.cheer.currentTime = 0)), e.showWheelViewOnLoad(), e.createAndInitClasses([]))
                        : ((e.queryStringHelper = new b()),
                          e.queryStringHelper.QueryString.hasQuery
                              ? (e.showWheelViewOnLoad(), e.createAndInitClasses(e.queryStringHelper.QueryString.query_string))
                              : (e.sections.intro.classList.add("active"), (e.confettiIntroHelper = new a(e.IntroConfettiObject)))),
                    Modernizr.touch
                        ? $("audio").remove()
                        : $("<img/>")
                              .attr("src", "http://stage.humblebee.se/fluky/img/armanim.png")
                              .load(function () {
                                  e.armShowing = !0;
                              }),
                    e.bindEvents(c);
            },
            bindEvents: function (a) {
                document.getElementById("start").addEventListener("click", function () {
                    e.confettiIntroHelper.StopConfetti(),
                        e.changeView(e.sections.intro, e.sections.wheel, function () {
                            e.createAndInitClasses([]);
                        });
                }),
                    $(".btn-wrapper")
                        .on("touchstart mouseenter", function () {
                            $(this).children(".big-btn").addClass("hover-touch");
                        })
                        .on("touchmove mouseleave click", function () {
                            $(this).children(".big-btn").removeClass("hover-touch");
                        }),
                    a ||
                        ($(".info").on("click", function () {
                            $(this).toggleClass("show");
                        }),
                        $("#audio .control").on("click", function () {
                            var a = $(this);
                            a.hasClass("playing") ? (a.removeClass("playing"), (e.theme.muted = !0), (e.cheer.muted = !0)) : (a.addClass("playing"), (e.theme.muted = !1), (e.cheer.muted = !1));
                        }));
            },
            clearUrl: function () {
                var a = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.pushState({ path: a }, "", a);
            },
            showWheelViewOnLoad: function () {
                (e.sections.intro.style.display = "none"), (e.sections.wheel.style.display = "block"), e.sections.wheel.classList.add("active");
            },
            createAndInitClasses: function (a) {
                (e.thingListHelper = new d(a)), (e.spinningWheelHelper = new c()), e.thingListHelper.bindEvents(), e.spinningWheelHelper.bindEvents();
            },
            changeView: function (a, b, c) {
                a.classList.remove("active"),
                    $(a).on(e.transEndEventName, function (d) {
                        "opacity" === d.originalEvent.propertyName && ((a.style.display = "none"), (b.style.display = "block"), b.classList.add("active"), "undefined" != typeof c && c());
                    });
            },
            errorHandling: function (a) {
                $(".error")
                    .text(a)
                    .addClass("show")
                    .on("animationend webkitAnimationEnd oAnimationEnd", function () {
                        $(".error").removeClass("show");
                    });
            },
            getRandom: function (a, b) {
                return Math.floor(Math.random() * a + b);
            },
            getFPS: function (a) {
                return a / 16;
            },
            getColor: function () {
                return "rgb(" + e.getRandom(180, 70) + "," + e.getRandom(180, 70) + "," + e.getRandom(180, 70) + ")";
            },
            shuffleArray: function (a) {
                for (var b = a.length - 1; b > 0; b--) {
                    var c = Math.floor(Math.random() * (b + 1)),
                        d = a[b];
                    (a[b] = a[c]), (a[c] = d);
                }
                return a;
            },
        },
        f = {
            init: function () {
                $("#wrapper").append(f.getHTML()), document.getElementById("restart").addEventListener("click", f.restart), e.init(!1);
            },
            restart: function () {
                $("#winner")
                    .removeClass("active")
                    .on(e.transEndEventName, function () {
                        e.confettiWinnerHelper.StopConfetti(),
                            $("#sections").remove(),
                            $(".wrapper").append(f.getHTML()),
                            twttr.widgets.load(),
                            FB.XFBML.parse(),
                            e.init(!0),
                            document.getElementById("restart").addEventListener("click", f.restart);
                    });
            },
            getHTML: function () {
                var a = $("#sections-template").html();
                return Handlebars.compile(a);
            },
        };
    $(document).ready(function () {
        FastClick.attach(document.body), f.init();
    });
})();
