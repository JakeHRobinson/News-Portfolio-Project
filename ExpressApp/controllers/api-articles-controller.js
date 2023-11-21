const {
  getArticle,
  getAllArticles,
  getAllComments,
} = require("../models/api-articles-model");
const { checkExists } = require("../models/api-checkExists-model");

exports.getArticleById = (req, res, next) => {
  getArticle(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res) => {
  getAllArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.getArticleComments = (req, res, next) => {
  const articlePromises = [getAllComments(req.params.article_id)];

  if (req.params.article_id) {
    articlePromises.push(
      checkExists("articles", "article_id", req.params.article_id)
    );
  }

  Promise.all(articlePromises)
    .then((resolvedPromises) => {
      const comments = resolvedPromises[0];
      res.status(200).send({ comments });
    })
    .catch(next);
};
