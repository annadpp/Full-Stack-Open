describe("Bloglist app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "testone",
      username: "testuserone",
      password: "testnumberone",
    };

    const usertwo = {
      name: "testtwo",
      username: "testusertwo",
      password: "testnumbertwo",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.request("POST", "http://localhost:3003/api/users/", usertwo);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testuserone");
      cy.get("#password").type("testnumberone");
      cy.get("#login-button").click();
      cy.contains("testone logged in");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("testuserone");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();
      cy.get(".error").contains("Wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("testuserone");
      cy.get("#password").type("testnumberone");
      cy.get("#login-button").click();
      cy.contains("one logged in");
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("http://test.com");
      cy.get("#create-button").click({ force: true });
      cy.contains("test title test author");
    });

    describe("and if a blog exists", function () {
      beforeEach(function () {
        cy.contains("create new blog").click();
        cy.get("#title").type("test title");
        cy.get("#author").type("test author");
        cy.get("#url").type("http://testurl.com");
        cy.get("#create-button").click({ force: true });
        cy.contains("test title test author");
      });

      it("the user can like it", function () {
        cy.contains("view").click();
        cy.contains("0").contains("likes").click();
        cy.contains("1");
      });

      it("the user can delete their blogs", function () {
        cy.contains("view").click();
        cy.get("#remove-button").click();
        cy.contains("remove").should("not.exist");
      });
    });

    describe("when there are > one users", function () {
      beforeEach(function () {
        cy.contains("logout").click();
        cy.get("#username").type("testusertwo");
        cy.get("#password").type("testnumbertwo");
        cy.get("#login-button").click();
        cy.contains("usertwo logged in");

        cy.contains("create new blog").click();
        cy.get("#title").type("test title two");
        cy.get("#author").type("test author two");
        cy.get("#url").type("http://testtwo.com");
        cy.get("#create-button").click({ force: true });
        cy.contains("test title two test author two");
      });

      it.only("only the user who created the blog can delete it", function () {
        cy.contains("logout").click();
        cy.get("#username").type("testuserone");
        cy.get("#password").type("numberone");
        cy.get("#login-button").click();
        cy.contains("one logged in");

        cy.contains("view").click();
        cy.contains("remove").should("not.exist");
      });

      it.only("orders blogs by likes", function () {
        cy.contains("create new blog").click();
        cy.get("#title").type("The title with most likes");
        cy.get("#author").type("atest");
        cy.get("#url").type("https://www.atest.com");
        cy.get("#create-button").click({ force: true });

        cy.contains("create new blog").click();
        cy.get("#title").type("The title with the second most likes");
        cy.get("#author").type("btest");
        cy.get("#url").type("https://www.btest.com");
        cy.get("#create-button").click({ force: true });

        cy.contains("Title with most likes").contains("view").click();
        cy.get("button").contains("like").click();

        cy.get(".blog").eq(0).should("contain", "Title with most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "Title with the second most likes");
      });
    });
  });
});
